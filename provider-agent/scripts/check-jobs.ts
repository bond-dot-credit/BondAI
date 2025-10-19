import { JsonRpcProvider, Contract, EventLog } from 'ethers';
import * as dotenv from 'dotenv';
import * as path from 'path';
import JobOfferABI from '../contract/JobOffer_ABI';

// Load .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';
const sellerAgentAddress = process.env.SELLER_AGENT_WALLET_ADDRESS;

async function checkJobs() {
  console.log('🔍 Checking for existing jobs...\n');
  console.log('Provider Agent Address:', sellerAgentAddress);
  console.log('ACPSimple Contract:', jobOfferingAddress);
  console.log('---\n');

  const provider = new JsonRpcProvider('https://sepolia.base.org');
  const jobOfferingContract = new Contract(jobOfferingAddress, JobOfferABI, provider);

  try {
    // Get current job counter to know how many jobs exist
    const jobCounter = await jobOfferingContract.jobCounter();
    console.log(`Total jobs created: ${jobCounter.toString()}\n`);

    // Check recent JobCreated events (last 10000 blocks)
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 10000);

    console.log(`Scanning blocks ${fromBlock} to ${currentBlock}...\n`);

    const events = await jobOfferingContract.queryFilter(
      jobOfferingContract.filters.JobCreated(),
      fromBlock,
      'latest'
    );

    console.log(`Found ${events.length} JobCreated events in recent blocks\n`);

    // Filter for jobs assigned to our provider
    const myJobs = events.filter((event) => {
      if (event instanceof EventLog) {
        const { provider: providerAddr } = event.args;
        return providerAddr.toLowerCase() === sellerAgentAddress?.toLowerCase();
      }
      return false;
    });

    console.log(`Jobs assigned to me: ${myJobs.length}\n`);

    if (myJobs.length > 0) {
      console.log('=== MY JOBS ===\n');

      for (const event of myJobs) {
        if (!(event instanceof EventLog)) continue;
        const { jobId, client, provider: providerAddr, evaluator } = event.args;

        // Get job details
        const job = await jobOfferingContract.jobs(jobId);

        console.log(`Job ID: ${jobId.toString()}`);
        console.log(`  Client: ${client}`);
        console.log(`  Provider: ${providerAddr}`);
        console.log(`  Evaluator: ${evaluator}`);
        console.log(`  Phase: ${job.phase} (0=Request, 1=Negotiation, 2=Transaction, 3=Evaluation, 4=Completed, 5=Rejected)`);
        console.log(`  Budget: ${job.budget.toString()}`);
        console.log(`  Block: ${event.blockNumber}`);
        console.log(`  Tx: ${event.transactionHash}`);

        // Try to get memos for this job
        try {
          const [memos, total] = await jobOfferingContract.getMemosForPhase(jobId, 0, 0, 10);
          console.log(`  Memos in Request phase: ${total.toString()}`);
          if (total > 0) {
            console.log(`  First memo content: ${memos[0].content}`);
          }
        } catch (error: any) {
          console.log(`  Could not fetch memos: ${error.message}`);
        }

        console.log('');
      }
    } else {
      console.log('No jobs assigned to your provider address.');
    }

    // Also check ALL recent jobs to see what's happening
    console.log('\n=== ALL RECENT JOBS ===\n');
    for (const event of events.slice(-5)) { // Last 5 jobs
      if (event instanceof EventLog) {
        const { jobId, client, provider: providerAddr, evaluator } = event.args;
        console.log(`Job ${jobId.toString()}: provider=${providerAddr}, block=${event.blockNumber}`);
      }
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error checking jobs:', errorMessage);
  }
}

checkJobs();
