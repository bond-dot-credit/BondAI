import { NextResponse } from 'next/server';
import { JsonRpcProvider, Contract } from 'ethers';
import JobOfferABI from '../../../contract/JobOffer_ABI';

const jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';
const sellerAgentAddress = process.env.SELLER_AGENT_WALLET_ADDRESS;

export async function GET() {
  try {
    const provider = new JsonRpcProvider('https://sepolia.base.org');
    const contract = new Contract(jobOfferingAddress, JobOfferABI, provider);

    // Get recent jobs (last 10000 blocks)
    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 10000);

    const events = await contract.queryFilter(
      contract.filters.JobCreated(),
      fromBlock,
      'latest'
    );

    // Filter for our jobs
    const myJobs = events.filter((event: any) => {
      const { provider: providerAddr } = event.args;
      return providerAddr.toLowerCase() === sellerAgentAddress?.toLowerCase();
    });

    let activeJobs = 0;
    let completedJobs = 0;

    // Check status of each job
    for (const event of myJobs) {
      const { jobId } = event.args;
      const job = await contract.jobs(jobId);

      if (job.phase === 4) { // COMPLETED
        completedJobs++;
      } else if (job.phase !== 5) { // Not REJECTED
        activeJobs++;
      }
    }

    return NextResponse.json({
      totalJobs: myJobs.length,
      activeJobs,
      completedJobs,
      rejectedJobs: myJobs.length - activeJobs - completedJobs
    });

  } catch (error: any) {
    console.error('Error fetching job stats:', error);
    return NextResponse.json({
      totalJobs: 0,
      activeJobs: 0,
      completedJobs: 0,
      rejectedJobs: 0,
      error: error.message
    }, { status: 500 });
  }
}
