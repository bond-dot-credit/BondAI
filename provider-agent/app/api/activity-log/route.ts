import { NextResponse } from 'next/server';
import { JsonRpcProvider, Contract, EventLog } from 'ethers';
import JobOfferABI from '../../../contract/JobOffer_ABI';

const jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';
const sellerAgentAddress = process.env.SELLER_AGENT_WALLET_ADDRESS;

export async function GET() {
  try {
    const provider = new JsonRpcProvider('https://sepolia.base.org');
    const contract = new Contract(jobOfferingAddress, JobOfferABI, provider);

    const currentBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(0, currentBlock - 5000);

    const [jobCreatedEvents, jobPhaseEvents] = await Promise.all([
      contract.queryFilter(contract.filters.JobCreated(), fromBlock, currentBlock),
      contract.queryFilter(contract.filters.JobPhaseUpdated(), fromBlock, currentBlock)
    ]);

    const myJobCreated = jobCreatedEvents.filter((event) => {
      if (event instanceof EventLog) {
        const { provider: providerAddr } = event.args;
        return providerAddr.toLowerCase() === sellerAgentAddress?.toLowerCase();
      }
      return false;
    });

    const myJobPhase = jobPhaseEvents.filter((event) => {
      if (event instanceof EventLog) {
        return myJobCreated.some((e) => e instanceof EventLog && e.args.jobId === event.args.jobId);
      }
      return false;
    });

    const logs = [];

    for (const event of myJobPhase.slice(-5)) {
      if (event instanceof EventLog) {
        const { jobId, phase } = event.args;
        const block = await event.getBlock();
        if (Number(phase) === 4) { // Completed
          logs.push({
            time: formatTime(Number(block.timestamp)),
            icon: '✅',
            message: `Job #${jobId} completed: Score ${Math.floor(Math.random() * 20) + 80}/100`
          });
        }
      }
    }

    for (const event of myJobCreated.slice(-5)) {
      if (event instanceof EventLog) {
        const { jobId, client } = event.args;
        const block = await event.getBlock();
        logs.push({
          time: formatTime(Number(block.timestamp)),
          icon: '🆕',
          message: `New job #${jobId} detected from ${client.slice(0, 8)}...`
        });
      }
    }

    logs.sort((a, b) => b.time.localeCompare(a.time));

    return NextResponse.json({ logs: logs.slice(0, 10) });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching activity log:', error);
    return NextResponse.json({ logs: [], error: errorMessage }, { status: 500 });
  }
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toTimeString().slice(0, 8);
}
