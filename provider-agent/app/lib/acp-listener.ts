import { keccak256, toUtf8Bytes, getBytes, concat, encodeBytes32String, JsonRpcProvider, Wallet, Contract, AbiCoder, BigNumberish, getAddress } from 'ethers';
import { IExec } from 'iexec';
import { IExecDataProtectorCore, getWeb3Provider } from '@iexec/dataprotector';
import axios from 'axios';
import JSZip from 'jszip';
// import { create } from 'ipfs-http-client';
import JobOfferABI from '../../contract/JobOffer_ABI';
import ReputationRegistryABI from '../../contract/ReputationRegistry_abi';

const jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';
const reputationRegistryAddress = '0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322';
const identityRegistryAddress = '0x7177a6867296406881E20d6647232314736Dd09A';

const sellerAgentAddress = process.env.SELLER_AGENT_WALLET_ADDRESS;
const sellerAgentPrivateKey = process.env.SELLER_AGENT_PRIVATE_KEY;
const whitelistedWalletPrivateKey = process.env.WHITELISTED_WALLET_PRIVATE_KEY;
const dummyAgentPrivateKey = process.env.DUMMY_AGENT_PRIVATE_KEY;
const dummyAgentAddress = process.env.DUMMY_AGENT_ADDRESS;
const dummyAgentId = 1;

// iExec app address (lowercase as per iExec SDK)
const iexecAppAddress = '0x2d1003f88b918828ca2377020d218e8ed6092367';

// Create an IPFS client
// const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

export async function handleNewJob(jobId: bigint, jobOfferingContract: Contract) {
  console.log(`Handling new job: ${jobId.toString()}`);

  try {
    const [memos, total] = await jobOfferingContract.getMemosForPhase(jobId, 0, 0, 10);

    if (total === 0n || Number(total) === 0) {
      console.error(`No memos found for job ${jobId.toString()}`);
      return;
    }

    const agentAddress = memos[0].content;
    console.log(`Agent to be scored: ${agentAddress}`);

    const result = await triggerIexecTask(agentAddress);

    if (result && result.scoreData && result.resultUrl) {
      await publishScore(result.scoreData, jobOfferingContract, jobId, result.resultUrl);
    }

  } catch (error: any) {
    console.error(`Error handling job ${jobId.toString()}:`, error);
  }
}

async function triggerIexecTask(agentAddress: string): Promise<{ scoreData: any, resultUrl: string } | null> {
  if (!whitelistedWalletPrivateKey) {
    console.error('WHITELISTED_WALLET_PRIVATE_KEY environment variable is not set.');
    return null;
  }

  // iExec runs on Bellecour (chain 134), not Base Sepolia
  const iexecProvider = new JsonRpcProvider('https://bellecour.iex.ec');
  const iexecSigner = new Wallet(whitelistedWalletPrivateKey, iexecProvider);
  const iexec = new IExec({ ethProvider: iexecSigner });

  try {
    console.log('🔐 Creating protected data for agent:', agentAddress);
    const dataProtector = new IExecDataProtectorCore(getWeb3Provider(whitelistedWalletPrivateKey));
    const protectedData = await dataProtector.protectData({ data: { agentAddress } });

    console.log('📋 Fetching iExec orders...');
    const apporderResult = await iexec.orderbook.fetchApporder({ app: iexecAppAddress });
    const apporder = (apporderResult as any).order || apporderResult;
    const workerpoolorder = await iexec.orderbook.fetchWorkerpoolorder({ category: apporder.category, minTag: 'tee' });

    console.log('📝 Creating request order...');
    const workerpool = (workerpoolorder as any).order || workerpoolorder;
    const requestorderToSign = await iexec.order.createRequestorder({
      app: iexecAppAddress,
      category: apporder.category,
      appmaxprice: apporder.appprice,
      workerpoolmaxprice: workerpool.workerpoolprice,
      requester: await iexecSigner.getAddress(),
      volume: 1,
      params: { iexec_args: agentAddress },
      dataset: protectedData.address,
    });
    const requestorder = await iexec.order.signRequestorder(requestorderToSign);

    console.log('🤝 Matching orders...');
    const deal = await iexec.order.matchOrders({ apporder, workerpoolorder, requestorder });
    const taskId = await iexec.deal.computeTaskId(deal.dealid, 0);

    console.log('⏳ Waiting for task results, taskId:', taskId);
    const results = await iexec.task.fetchResults(taskId);

    if (results && results.url) {
      console.log('📥 Downloading results from:', results.url);
      const response = await axios.get(results.url, { responseType: 'arraybuffer' });
      const zip = await JSZip.loadAsync(response.data);
      const resultFile = zip.file('giza_score_result.json');

      if (resultFile) {
        const resultContent = await resultFile.async('string');
        const scoreData = JSON.parse(resultContent);
        console.log('✅ Score calculated:', scoreData.final_score);

        return { scoreData, resultUrl: results.url };
      }
    }
  } catch (error: any) {
    console.error('❌ Error triggering iExec task:', error);
  }
  return null;
}

async function publishScore(scoreData: any, jobOfferingContract: Contract, jobId: bigint, iexecResultUrl: string) {
  if (!sellerAgentPrivateKey) {
    console.error('SELLER_AGENT_PRIVATE_KEY environment variable is not set.');
    return;
  }

  if (!dummyAgentPrivateKey) {
    console.error('DUMMY_AGENT_PRIVATE_KEY environment variable is not set.');
    return;
  }

  try {
    // Use iExec's IPFS gateway URL directly
    const fileuri = iexecResultUrl.replace('https://ipfs.iex.ec/ipfs/', 'ipfs://');
    console.log('📎 Result URI:', fileuri);

    const ethProvider = new JsonRpcProvider('https://sepolia.base.org');
    const dummyAgentWallet = new Wallet(dummyAgentPrivateKey, ethProvider);
    const providerWallet = new Wallet(sellerAgentPrivateKey, ethProvider);

    const reputationRegistry = new Contract(reputationRegistryAddress, ReputationRegistryABI, dummyAgentWallet);

    const feedbackAuth = {
      agentId: dummyAgentId,
      clientAddress: sellerAgentAddress,
      indexLimit: 1,
      expiry: Math.floor(Date.now() / 1000) + 3600,
      chainId: 84532,
      identityRegistry: identityRegistryAddress,
      signerAddress: dummyAgentAddress,
    };

    const structHash = keccak256(AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'uint64', 'uint256', 'uint256', 'address', 'address'], Object.values(feedbackAuth)));
    const messageHash = keccak256(toUtf8Bytes(`\x19Ethereum Signed Message:\n32${structHash.slice(2)}`));
    const signature = await dummyAgentWallet.signMessage(getBytes(messageHash));

    const feedbackAuthBytes = AbiCoder.defaultAbiCoder().encode(['uint256', 'address', 'uint64', 'uint256', 'uint256', 'address', 'address'], Object.values(feedbackAuth));
    const fullAuth = concat([feedbackAuthBytes, signature]);

    const score = Math.round(scoreData.final_score);
    const filehash = keccak256(toUtf8Bytes(JSON.stringify(scoreData)));

    console.log('📝 Publishing score to ReputationRegistry...');
    const tx = await reputationRegistry.giveFeedback(dummyAgentId, score, encodeBytes32String('giza-score'), encodeBytes32String(''), fileuri, filehash, fullAuth);
    await tx.wait();
    console.log('✅ Score published:', tx.hash);

    // Deliver the DeliverableMemo (provider creates the memo)
    console.log('📤 Sending DeliverableMemo...');
    const deliverableMemo = await (jobOfferingContract.connect(providerWallet) as any).createMemo(jobId, fileuri, 1, false, 3);
    await deliverableMemo.wait();
    console.log('✅ DeliverableMemo sent:', deliverableMemo.hash);

  } catch (error: any) {
    console.error('❌ Error publishing score:', error);
  }
}

// Track processed jobs to avoid duplicates
const processedJobs = new Set<string>();
let lastCheckedBlock = 0;

export function startAcpListener() {
  if (!sellerAgentAddress) {
    console.error('SELLER_AGENT_WALLET_ADDRESS environment variable is not set.');
    return;
  }

  console.log('🚀 Starting ACP listener for agent:', sellerAgentAddress);

  const provider = new JsonRpcProvider('https://sepolia.base.org', {
    name: 'base-sepolia',
    chainId: 84532
  });

  const jobOfferingContract = new Contract(jobOfferingAddress, JobOfferABI, provider);

  console.log('🎧 Listening for JobCreated events on contract:', jobOfferingAddress);

  // Initialize last checked block
  provider.getBlockNumber().then(blockNum => {
    lastCheckedBlock = blockNum;
    console.log(`📍 Starting from block: ${lastCheckedBlock}`);
  });

  // Poll for new events instead of using event listeners
  // This avoids filter expiration issues
  const pollInterval = 12000; // Poll every 12 seconds (Base block time)

  setInterval(async () => {
    try {
      const currentBlock = await provider.getBlockNumber();

      // Only query if there are new blocks
      if (currentBlock <= lastCheckedBlock) {
        return;
      }

      const fromBlock = lastCheckedBlock + 1;
      const toBlock = currentBlock;

      // Query for JobCreated events in the new blocks
      const events = await jobOfferingContract.queryFilter(
        jobOfferingContract.filters.JobCreated(),
        fromBlock,
        toBlock
      );

      if (events.length > 0) {
        console.log(`📬 Found ${events.length} new job(s) in blocks ${fromBlock}-${toBlock}`);

        for (const event of events) {
          if (!('args' in event)) continue;
          const { jobId, client, provider: providerAddr, evaluator } = event.args as any;
          const jobKey = `${jobId.toString()}-${event.blockNumber}`;

          // Skip if already processed
          if (processedJobs.has(jobKey)) {
            continue;
          }

          processedJobs.add(jobKey);

          console.log('🎉 New job created!', {
            jobId: jobId.toString(),
            client,
            provider: providerAddr,
            evaluator,
            block: event.blockNumber
          });

          if (providerAddr.toLowerCase() === sellerAgentAddress.toLowerCase()) {
            console.log('✅ This job is for me!');

            // Handle job asynchronously
            handleNewJob(jobId, jobOfferingContract).catch(error => {
              console.error('❌ Error handling job:', error.message);
            });
          } else {
            console.log('⏭️  Job is for another provider:', providerAddr);
          }
        }
      }

      lastCheckedBlock = currentBlock;

      // Clean up old processed jobs (keep last 1000)
      if (processedJobs.size > 1000) {
        const toRemove = Array.from(processedJobs).slice(0, processedJobs.size - 1000);
        toRemove.forEach(key => processedJobs.delete(key));
      }

    } catch (error: any) {
      console.error('⚠️  Polling error:', error.message);
    }
  }, pollInterval);

  console.log('✅ ACP Listener initialized successfully (polling mode)');
}