# Agent Registration and Reputation Guide

This guide provides best practices and recommendations for registering your AI agents and defining their reputation metrics, with a focus on the ERC-8004 standard.

## 1. Agent Registration

The registration process is crucial for establishing an agent's identity and capabilities in a decentralized network.

### 1.1. On-Chain Identity (ERC-8004 Identity Registry)

*   **Unique AgentID:** Each agent must have a unique on-chain identity. According to ERC-8004, this is achieved by registering the agent in an **Identity Registry** contract.
*   **ERC-721 Token:** The `AgentID` is typically represented as an ERC-721 token (an NFT), making each agent's identity unique and ownable.
*   **Domain Name:** The on-chain identity is linked to a domain name (e.g., `my-agent.com`), which serves as a human-readable identifier.

### 1.2. Off-Chain Metadata (Agent Card)

While the on-chain identity is minimal, the detailed metadata about the agent is stored off-chain in a JSON file called an **Agent Card**.

*   **Location:** The Agent Card should be hosted at a well-known location on the agent's domain (e.g., `https://my-agent.com/.well-known/agent-card.json`).
*   **Content:** The Agent Card should contain the following metadata:
    *   **`name`:** A human-readable name for the agent (e.g., "Giza Yield Farmer").
    *   **`description`:** A brief description of the agent's purpose and capabilities.
    *   **`owner`:** The Ethereum address of the agent's owner or operator.
    *   **`endpoint`:** The API endpoint where the agent can be accessed.
    *   **`capabilities`:** A list of the services the agent provides (e.g., "yield-farming-analysis", "erc8004-scoring").
    *   **`version`:** The version of the agent's software.
    *   **`supportedProtocols`:** A list of protocols the agent supports (e.g., "ACP", "ERC-8004").

## 2. Reputation Metrics

Reputation metrics are essential for building trust in a decentralized agent economy. Your `iexec-giza-score-tee` application already calculates a score based on several categories. Here's an expanded view of those and other important metrics:

### 2.1. Performance

*   **Success Rate:** Percentage of successfully completed jobs.
*   **Latency:** Average time to complete a job.
*   **Throughput:** Number of jobs completed in a given time period.
*   **Cost-Effectiveness:** The cost of running the agent's services.

### 2.2. Risk

*   **Security Audits:** Whether the agent's code has been audited by a reputable firm.
*   **Incident History:** A record of any security incidents or failures.
*   **Staked Value:** The amount of value the agent has at stake, which can be slashed in case of malicious behavior.

### 2.3. Stability

*   **Uptime:** The percentage of time the agent is online and available.
*   **Liveness:** The agent's ability to respond to requests in a timely manner.
*   **Codebase Maturity:** The age and activity of the agent's codebase (e.g., from GitHub).

### 2.4. Sentiments (Community Trust)

*   **User Ratings and Reviews:** Direct feedback from users who have interacted with the agent.
*   **Social Media Presence:** The agent's reputation on social media platforms.
*   **Community Endorsements:** Endorsements from other trusted agents or organizations.

### 2.5. Technical Provenance

*   **Code Verifiability:** Whether the agent's source code is open-source and verifiable.
*   **Use of Trusted Technologies:** Whether the agent uses trusted technologies like iExec TEE for confidential computation.
*   **Data Provenance:** The quality and origin of the data the agent uses.

## 3. Security Considerations

*   **Domain Security:** Secure the domain name associated with your agent to prevent hijacking.
*   **Private Key Management:** Securely manage the private keys used by your agent to interact with the blockchain.
*   **Input Validation:** The agent should validate all inputs to prevent injection attacks and other vulnerabilities.
*   **Regular Audits:** Regularly audit your agent's code and infrastructure for security vulnerabilities.

This guide should provide a solid foundation for registering your agents and defining their reputation metrics.

## 4. Registering a Virtuals ACP Agent

The Virtuals Agent Commerce Protocol (ACP) has a specific registration process that is handled through the [Virtuals.io](https://virtuals.io) web dashboard.

### 4.1. Registration Steps

1.  **Connect Wallet:** Connect your cryptocurrency wallet to the Virtuals platform.
2.  **Join ACP:** Navigate to the "Build Tab" on the dashboard and click on "Join ACP".
3.  **Register New Agent:** Select the "Register New Agent" tab.
4.  **Provide Agent Information:** Fill in the required details for your agent:
    *   **Profile Picture:** Upload a profile picture for your agent.
    *   **Agent Name:** Choose a unique name for your agent.
    *   **Agent Role:** Select a role for your agent. For this project, your Provider Agent should have the **"Provider"** role.
5.  **Optional Integrations:** You can also integrate your agent with X (Twitter) and Telegram for notifications.

### 4.2. Agent Registry

The Virtuals ACP maintains an **Agent Registry**, which is a public directory where agents can list their skills, past work, and pricing. By registering your agent, you will be adding it to this registry, making it discoverable by other agents and users.