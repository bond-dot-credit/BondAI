
import { ethers } from 'ethers';

// TODO: Replace with the actual ABI of the JobOffering contract
const jobOfferingAbi = [
  // Example event: 'JobCreated(address indexed buyer, uint256 jobId)'
  'event JobCreated(address indexed buyer, uint256 jobId)',
];

// TODO: Replace with the actual address of the deployed JobOffering contract
const jobOfferingAddress = '0x...'; // Address on Base testnet

/**
 * Starts listening for new job requests on the ACP JobOffering contract.
 */
export function startAcpListener() {
  console.log('🚀 Starting ACP listener...');

  // TODO: Use a more robust provider for production (e.g., from environment variables)
  const provider = new ethers.JsonRpcProvider('https://goerli.base.org');

  const jobOfferingContract = new ethers.Contract(
    jobOfferingAddress,
    jobOfferingAbi,
    provider
  );

  console.log('🎧 Listening for JobCreated events on contract:', jobOfferingAddress);

  jobOfferingContract.on('JobCreated', (buyer, jobId, event) => {
    console.log('🎉 New job created!');
    console.log('  - Buyer:', buyer);
    console.log('  - Job ID:', jobId.toString());
    console.log('  - Transaction Hash:', event.log.transactionHash);

    // TODO: Add logic to handle the new job
    // 1. Trigger the scoring pipeline (iExec task)
    // 2. Update job status
  });

  provider.on('error', (error) => {
    console.error('Provider error:', error);
  });

  jobOfferingContract.on('error', (error) => {
    console.error('Contract error:', error);
  });
}
