# End-to-End Testing Guide

This guide provides a step-by-step plan for testing the end-to-end workflow of the ERC-8004 Score-as-a-Service project.

## Testing Steps

### 1. Create a Job with Remix

**1. Open Remix:** Go to [https://remix.ethereum.org/](https://remix.ethereum.org/).

**2. Connect to Base Sepolia:**
*   In the "Deploy & run transactions" tab, select "Injected Provider - MetaMask" from the "Environment" dropdown.
*   Make sure your MetaMask is connected to the Base Sepolia testnet.

**3. Load the `ACPSimple` Contract:**
*   In the "Deploy & run transactions" tab, paste the address of the `ACPSimple` contract (`0x959591Bab069599cAbb2A72AA371503ba2d042FF`) into the "At Address" field.
*   Provide the ABI of the `ACPSimple` contract (from `provider-agent/contract/JobOffer_ABI.ts`).
*   Click the "At Address" button. This will load the contract in Remix.

**4. Create the Job:**
*   In the "Deployed Contracts" section, expand the `ACPSimple` contract.
*   Find the `createJob` function.
*   Enter the address of your "BondAI" Provider Agent (`SELLER_AGENT_WALLET_ADDRESS` from your `.env.local` file) as the `provider`.
*   Click the "transact" button to create the job.

**5. Create the Memo:**
*   After the `createJob` transaction is confirmed, find the `createMemo` function.
*   Enter the `jobId` that you got from the `createJob` transaction.
*   Enter the address of your "dummy" agent (`DUMMY_AGENT_ADDRESS` from your `.env.local` file) as the `content`.
*   Click the "transact" button to create the memo.

### 2. Monitor the Provider Agent
*   Observe the console output of the Provider Agent. You should see log messages indicating that a new job has been detected and that the iExec task has been triggered.

### 3. Monitor the iExec Task
*   The Provider Agent will log the iExec task ID. You can use the iExec Explorer (`https://explorer.iex.ec/bellecour/task/<taskId>`) to monitor the status of the task.

### 4. Verify the Score Publication
*   After the iExec task is complete, the Provider Agent will publish the score to the `ReputationRegistry` contract at `0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322`.
*   You can interact with the `ReputationRegistry` contract to verify that the new attestation has been recorded. You can call the `getAttestation` function with the attestation ID (which will be logged by the Provider Agent).

### 5. Approve the Deliverable and Claim Payment
*   Using the "Buyer Agent" wallet, call the `signMemo` function on the `ACPSimple` contract to approve the `DeliverableMemo`.
*   This will mark the job as `COMPLETED` and release the payment to the "BondAI" Provider Agent. You can verify the token balance of the Provider Agent to confirm that the payment has been received.

This testing plan covers all the steps of the workflow and will help to ensure that the project is working as expected.
