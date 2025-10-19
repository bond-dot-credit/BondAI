import { NextResponse } from 'next/server';
import { JsonRpcProvider, Contract } from 'ethers';
import JobOfferABI from '../../../contract/JobOffer_ABI';
import { handleNewJob } from '../../lib/acp-listener';

const jobOfferingAddress = '0x959591Bab069599cAbb2A72AA371503ba2d042FF';

export async function POST(request: Request) {
  try {
    const { jobId } = await request.json();

    if (!jobId) {
      return NextResponse.json({ error: 'jobId is required' }, { status: 400 });
    }

    console.log(`\n🔧 Manually processing Job ID: ${jobId}\n`);

    const provider = new JsonRpcProvider('https://sepolia.base.org');
    const contract = new Contract(jobOfferingAddress, JobOfferABI, provider);

    // Run job processing in background
    handleNewJob(BigInt(jobId), contract).catch(error => {
      console.error('Error processing job:', error);
    });

    return NextResponse.json({
      success: true,
      message: `Job ${jobId} processing started`,
      jobId
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to trigger job processing:', error);
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 500 });
  }
}
