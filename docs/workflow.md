# Provider Agent Workflow

This document describes the end-to-end workflow of the ERC-8004 Score-as-a-Service Provider Agent.

1.  **Job Creation:**
    *   A "Buyer Agent" creates a new job on the `ACPSimple` contract by calling the `createJob` function.
    *   The Buyer Agent specifies the address of the "BondAI" Provider Agent as the `provider`.
    *   The Buyer Agent creates a memo containing the Ethereum address of the agent to be scored.

2.  **Job Detection:**
    *   The "BondAI" Provider Agent is continuously listening for `JobCreated` events on the `ACPSimple` contract.
    *   When a new event is detected, the Provider Agent checks if it is the designated `provider` for the job.

3.  **Job Acceptance and iExec Task Triggering:**
    *   If the job is for the "BondAI" agent, it accepts the job and retrieves the agent address to be scored from the job's initial memo.
    *   The Provider Agent then triggers the `iexec-giza-score-tee` application on the iExec network. It creates a protected data set containing the agent address and submits a task to the iExec network.

4.  **iExec Task Execution and Result Processing:**
    *   The `iexec-giza-score-tee` application runs in a Trusted Execution Environment (TEE), ensuring the confidentiality of the scoring process.
    *   The application calculates the agent's reputation score and outputs the results to a JSON file.
    *   The Provider Agent polls for the task completion and downloads the results zip file.
    *   It then unzips the file and parses the `giza_score_result.json` file to get the score data.

5.  **IPFS Upload and Score Publication:**
    *   The Provider Agent uploads the `giza_score_result.json` file to IPFS to get a permanent, decentralized URL.
    *   The Provider Agent then calls the `giveFeedback` function on the `ReputationRegistry` contract to publish the score. It provides the score, the IPFS URL of the results, and a signed `feedbackAuth` from the dummy agent.

6.  **Deliverable and Payment:**
    *   The Provider Agent creates a `DeliverableMemo` on the `ACPSimple` contract, containing the IPFS URL of the results.
    *   The Buyer Agent verifies the deliverable and signs the memo to approve it.
    *   Upon approval, the job is marked as `COMPLETED`, and the payment is released from the escrow to the "BondAI" Provider Agent.

This workflow describes the complete lifecycle of a scoring job, from creation to payment.
