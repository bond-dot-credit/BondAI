# End-to-End Testing Guide

This guide provides a step-by-step plan for testing the end-to-end workflow of the ERC-8004 Score-as-a-Service project.

## 1. Setup

### 1.1. IPFS Node

**Why do we need it?**
Our Provider Agent needs a place to store the `giza_score_result.json` file so that the Buyer Agent can access it. We use IPFS (InterPlanetary File System), a decentralized storage network, to store this file and get a unique, permanent link to it.

**How to set it up:**
The easiest way to run a local IPFS node is to use [IPFS Desktop](https://ipfs.io/desktop/).
1.  Download and install IPFS Desktop.
2.  Launch the application. It will automatically start an IPFS node on your machine.
3.  Make sure your node is running before you start the Provider Agent.

### 1.2. "Buyer Agent" Wallet

You will need a separate Ethereum wallet to act as the "Buyer Agent". This wallet should be funded with some Base Sepolia ETH for gas fees. You can get some from a faucet.

### 1.3. Provider Agent

1.  **Set Environment Variables:** Make sure all the environment variables in the `.env.local` file are correctly set.
2.  **Start the Agent:** Run the Provider Agent with the `npm run dev` command.

## 2. Testing Steps

### 2.1. Create a Job with Remix

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

### 2.2. Monitor the Provider Agent
*   Observe the console output of the Provider Agent. You should see log messages indicating that a new job has been detected and that the iExec task has been triggered.

### 2.3. Monitor the iExec Task
*   The Provider Agent will log the iExec task ID. You can use the iExec Explorer (`https://explorer.iex.ec/bellecour/task/<taskId>`) to monitor the status of the task.

### 2.4. Verify the Score Publication
*   After the iExec task is complete, the Provider Agent will publish the score to the `ReputationRegistry` contract at `0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322`.
*   You can interact with the `ReputationRegistry` contract to verify that the new attestation has been recorded. You can call the `getAttestation` function with the attestation ID (which will be logged by the Provider Agent).

### 2.5. Verify the Deliverable
*   The Provider Agent will send a `DeliverableMemo` to the `ACPSimple` contract, containing the IPFS URL of the results.
*   You can get this URL from the memo and view the `giza_score_result.json` file in your browser by using an IPFS gateway (e.g., `https://ipfs.io/ipfs/<cid>`).

### 2.6. Approve the Deliverable and Claim Payment
*   Using the "Buyer Agent" wallet, call the `signMemo` function on the `ACPSimple` contract to approve the `DeliverableMemo`.
*   This will mark the job as `COMPLETED` and release the payment to the "BondAI" Provider Agent. You can verify the token balance of the Provider Agent to confirm that the payment has been received.

This testing plan covers all the steps of the workflow and will help to ensure that the project is working as expected.