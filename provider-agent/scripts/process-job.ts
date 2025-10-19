import { JsonRpcProvider, Contract } from 'ethers';
import * as dotenv from 'dotenv';
import * as path from 'path';
import JobOfferABI from '../contract/JobOffer_ABI';
import { handleNewJob } from '../app/lib/acp-listener';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';

async function processJob(jobId: number) {
  console.log(`\n🔧 Manually processing Job ID: ${jobId}\n`);

  const provider = new JsonRpcProvider('https://sepolia.base.org');
  const contract = new Contract(jobOfferingAddress, JobOfferABI, provider);

  await handleNewJob(BigInt(jobId), contract);

  console.log('\n✅ Job processing completed');
}

const jobId = process.argv[2] ? parseInt(process.argv[2]) : 1;
processJob(jobId).catch(console.error);
