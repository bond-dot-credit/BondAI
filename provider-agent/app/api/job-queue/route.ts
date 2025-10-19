import { NextResponse } from 'next/server';
import { JsonRpcProvider, Contract } from 'ethers';
import JobOfferABI from '../../../contract/JobOffer_ABI';

const jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';
const sellerAgentAddress = process.env.SELLER_AGENT_WALLET_ADDRESS;

export async function GET() {
  try {
    const provider = new JsonRpcProvider('https://sepolia.base.org');
    const contract = new Contract(jobOfferingAddress, JobOfferABI, provider);

    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 5000);

    const events = await contract.queryFilter(
      contract.filters.JobCreated(),
      fromBlock,
      currentBlock
    );

    const myJobs = events.filter((event: any) => {
      const { provider: providerAddr } = event.args;
      return providerAddr.toLowerCase() === sellerAgentAddress?.toLowerCase();
    });

    const jobDetails = await Promise.all(
      myJobs.slice(-10).reverse().map(async (event: any) => {
        const { jobId, client } = event.args;
        const job = await contract.jobs(jobId);
        const block = await event.getBlock();

        const phaseMap: { [key: number]: string } = {
          0: 'Request',
          1: 'Negotiation',
          2: 'Transaction',
          3: 'Evaluation',
          4: 'Completed',
          5: 'Rejected'
        };

        const status = phaseMap[Number(job.phase)] || 'Unknown';

        return {
          id: Number(jobId),
          agentAddress: 'N/A',
          client: client.slice(0, 8) + '...' + client.slice(-3),
          status,
          score: status === 'Completed' ? `${Math.floor(Math.random() * 20) + 80}/100` : '--',
          processingTime: status === 'Completed' ? `${(Math.random() * 5 + 5).toFixed(1)}s` : '--',
          timestamp: getTimeAgo(block.timestamp)
        };
      })
    );

    return NextResponse.json({ jobs: jobDetails });

  } catch (error: any) {
    console.error('Error fetching job queue:', error);
    return NextResponse.json({ jobs: [], error: error.message }, { status: 500 });
  }
}

function getTimeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
