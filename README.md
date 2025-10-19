# BondAI - Verifiable Reputation Scoring for AI Agents

> **Hackathon Cluster:** Agent Infrastructure & DeFi x AI
> **Demo:** [bondai-demo.vercel.app](https://bond-ai-liart.vercel.app/) 
> **Main Platform:** [bond.credit](https://bond.credit)

## 🎯 Project Overview

**BondAI** is the first decentralized reputation scoring infrastructure for AI agents, enabling autonomous economic actors to build verifiable credit history and access capital markets. We solve the fundamental trust gap preventing AI agents from scaling in the agentic economy by providing confidential, verifiable reputation scoring as a service.

### The Problem We Solve

AI agents need verifiable reputation to build trust in autonomous economies, but currently:
- ❌ No standardized way to verify agent creditworthiness on-chain
- ❌ Agents expose sensitive behavioral data when proving reputation
- ❌ No bridge between agent performance and capital access
- ❌ Traditional credit scoring can't handle agent-to-agent transaction speed

### Our Solution

BondAI provides **confidential, autonomous reputation scoring** that:
- ✅ Computes credit scores in iExec's Trusted Execution Environment (TEE)
- ✅ Publishes verifiable scores to ERC-8004 reputation registry
- ✅ Enables agents to access credit lines through BondAVS
- ✅ Uses standardized metrics and metadata adapters for agent rating

**BondAI doesn't just provide credit scores** - it provides reputation weighting for financial agents, enabling them to capitalize and scale their operations.

---

## 🌟 Built on Virtuals Protocol - The Perfect Foundation

### Why Virtuals ACP is Essential to BondAI

BondAI is **deeply integrated** with Virtuals Protocol's Agent Commerce Protocol (ACP), making it a showcase for how ACP enables complex, multi-step autonomous services:

**1. Job Lifecycle Management** 🔄
- ACP handles the complete credit scoring workflow from request to delivery
- Client creates job → Provider processes → Score delivered → Payment settled
- **This proves ACP can orchestrate sophisticated financial services**, not just simple tasks

**2. Agent-to-Agent Commerce** 💼
- BondAI acts as a **Provider Agent** serving other AI agents
- Demonstrates true agent economy: agents rating agents, autonomously
- **First reputation-as-a-service** running entirely on ACP infrastructure

**3. Payment & Settlement** 💰
- Leverages ACP's built-in payment mechanisms for service delivery
- Automatic escrow and release on job completion
- **Shows ACP can handle high-value transactions** (credit scoring determines capital access)

**4. Memo System for Data Exchange** 📋
- Uses ACP memos to communicate agent addresses and scoring results
- Proves ACP's messaging layer can handle structured financial data
- **Demonstrates ACP's versatility** beyond simple text exchanges

**5. Event-Driven Architecture** ⚡
- Provider agent listens to `JobCreated` events in real-time
- Autonomous processing without human intervention
- **Showcases ACP's suitability for always-on financial services**

### BondAI Makes ACP More Valuable

**For Virtuals Protocol:**
- ✅ **First credit/reputation service** on ACP - expands use cases beyond chat/creation
- ✅ **Production-ready infrastructure** - shows ACP can handle mission-critical services
- ✅ **Attracts DeFi agents** - brings financial AI agents to the ecosystem
- ✅ **Creates network effects** - more agents need reputation → more agents use BondAI → more agents join Virtuals

**For Agent Developers:**
- ✅ **Essential service** - every agent eventually needs reputation/credit
- ✅ **Easy integration** - just create a job on ACP, scoring happens automatically
- ✅ **Composable** - other services can query ERC-8004 scores for risk assessment
- ✅ **Trust layer** - enables agents to transact with confidence

**For the Ecosystem:**
- ✅ **Unlocks new markets** - agent lending, agent insurance, agent bonds
- ✅ **Increases ACP volume** - recurring service (agents need periodic re-scoring)
- ✅ **Proves real utility** - not a demo, but a fundamental infrastructure piece
- ✅ **Path to mainnet** - clear value prop for production deployment

---

## 🚀 How Virtuals ACP Powers BondAI

### The ACP Advantage

**Without ACP, BondAI would need:**
- Custom job queue infrastructure ❌
- Manual payment collection and escrow ❌
- Agent discovery and routing logic ❌
- Dispute resolution mechanisms ❌
- Service registry and reputation ❌

**With ACP, BondAI gets:**
- Battle-tested job orchestration ✅
- Built-in payment and settlement ✅
- Automatic agent matching ✅
- Protocol-level guarantees ✅
- Native integration with Virtuals ecosystem ✅

### Real ACP Integration Examples

**Job Creation (Client-Side):**
```solidity
// Any agent can request scoring via ACP
IJobOffering.createJob(
    providerAgent,        // BondAI provider
    evaluatorAgent,       // Score validator
    budgetAmount,         // Payment for service
    deadline
);

// Attach agent address to score
createMemo(jobId, agentAddress, REQUEST_PHASE);
```

**Job Processing (Provider-Side):**
```typescript
// BondAI listens to ACP events
contract.on("JobCreated", async (jobId, client, provider) => {
  if (provider === ourAddress) {
    // 1. Extract agent address from memos
    const agentAddress = await getAgentFromMemo(jobId);

    // 2. Score in iExec TEE
    const score = await computeInTEE(agentAddress);

    // 3. Publish to ERC-8004
    await publishScore(agentAddress, score);

    // 4. Deliver via ACP
    await createMemo(jobId, scoreProof, DELIVERABLE_PHASE);
  }
});
```

**This is ACP at its best** - complex multi-chain workflow, fully autonomous, real value creation.

---

## 💎 Why BondAI is the Perfect ACP Showcase

### Technical Sophistication
1. **Multi-Chain Orchestration**
   - ACP on Base Sepolia (job management)
   - iExec on Bellecour (computation)
   - Back to Base (score publishing)
   - **Proves ACP can coordinate cross-chain workflows**

2. **Real-Time Event Processing**
   - Sub-12 second job detection
   - Automatic provider response
   - **Shows ACP's suitability for time-sensitive services**

3. **Stateful Service Delivery**
   - Tracks job progress through phases
   - Maintains data across chains
   - **Demonstrates ACP can handle complex state machines**

### Business Model Alignment
1. **Recurring Revenue**
   - Agents need periodic re-scoring (monthly/quarterly)
   - **Creates sustained ACP transaction volume**

2. **Network Effects**
   - More agents → more reputation data → better scoring models
   - **Grows with the Virtuals ecosystem**

3. **B2B2C Model**
   - BondAI serves agents (B2B)
   - Agents serve end users (B2C)
   - **Expands ACP's addressable market**

### Ecosystem Contribution
1. **Infrastructure Primitive**
   - Other services can build on top (lending, insurance, staking)
   - **Makes entire ecosystem more valuable**

2. **Agent Onboarding**
   - Attracts DeFi-focused AI agents to Virtuals
   - **Brings new user segments**

3. **Real-World Use Case**
   - Solves actual problem (agent credit access)
   - **Proves Virtuals vision of autonomous economy**

---

## 🏗️ Architecture

### Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Virtuals ACP (Base Sepolia)          │
│              Job Orchestration & Payments               │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              BondAI Provider Agent (Node.js)            │
│          Event Listener & Job Processing                │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              iExec TEE (Bellecour Chain)                │
│         Confidential ML Scoring Computation             │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│            ERC-8004 Reputation Registry                 │
│          ChaosChain Infrastructure (Base)               │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                 BondAVS Credit Underwriting             │
│          Agent Performance → Capital Access             │
└─────────────────────────────────────────────────────────┘
```

### Core Components

1. **Virtuals Agent Commerce Protocol (ACP)**
   - Job lifecycle management on Base Sepolia (Chain ID: 84532)
   - Contract: `0x959591Bab069599cAbb2A72AA371503ba2d042FF`
   - Handles client requests and payment settlement

2. **iExec Trusted Execution Environment**
   - Runs on Bellecour chain (Chain ID: 134)
   - Confidential computation of agent credit scores
   - Protected data ensures privacy of agent metrics

3. **ERC-8004 Reputation Registry**
   - First implementation on Base Sepolia for AI agents
   - Contract: `0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322`
   - Standardized, portable reputation scores
   - Built on ChaosChain infrastructure

4. **X402 Payment Protocol**
   - Enables autonomous agentic payments
   - Seamless credit line transactions

---

## 🚀 How It Works

### End-to-End Workflow

```mermaid
sequenceDiagram
    participant Client
    participant ACP
    participant Provider
    participant iExec
    participant ERC8004

    Client->>ACP: Create scoring job
    ACP->>Provider: Emit JobCreated event
    Provider->>iExec: Submit agent data to TEE
    iExec->>iExec: Confidential ML scoring
    iExec->>Provider: Return encrypted score
    Provider->>ERC8004: Publish score on-chain
    Provider->>ACP: Send deliverable memo
    ACP->>Client: Job completed
```

### Step-by-Step Process

1. **Job Creation**
   - Client submits agent address via ACP contract
   - Provider agent monitors `JobCreated` events
   - Agent data includes standardized metrics and metadata

2. **Confidential Scoring**
   - Provider creates protected data in iExec
   - TEE executes ML scoring model (Giza-powered)
   - Computation happens in secure enclave on Bellecour

3. **Score Publication**
   - Score published to ERC-8004 ReputationRegistry
   - First agent feedback on Base Sepolia
   - Verifiable and queryable by any protocol

4. **Credit Access**
   - Agents with verified scores can access BondAVS
   - Credit lines underwritten by reputation weight
   - Real capital for autonomous economic actors

---

## 💡 Innovation & Impact

### First-of-Its-Kind Achievements

- 🥇 **First Giza agent registered** in identity registry
- 🥇 **First agent feedback** on Base Sepolia ERC-8004
- 🥇 **First integration** of Virtuals ACP + iExec TEE + ERC-8004
- 🥇 **First confidential credit scoring** for AI agents

### Why This Matters

**For AI Agents:**
- Build verifiable on-chain reputation
- Access capital markets autonomously
- Scale operations with credit facilities

**For Protocols:**
- Trust scores for agent interactions
- Risk assessment for agent-to-agent transactions
- Standardized reputation queries via ERC-8004

**For the Agentic Economy:**
- Unlocks $XXB in agent credit markets
- Enables autonomous economic growth
- Creates bridges between AI performance and real capital

### Alignment with Virtuals Protocol

BondAI is **the butler for rating agents** - an SDK that routes scoring through our channels, providing users with agent-powered yield. This infrastructure can evolve into a full product on Virtuals ACP, enabling any agent to access credit scoring services autonomously.

---

## 🛠️ Technical Implementation

### Smart Contracts (Base Sepolia)

| Contract | Address | Purpose |
|----------|---------|---------|
| ACP JobOffer | `0x959591Bab069599cAbb2A72AA371503ba2d042FF` | Job orchestration |
| IdentityRegistry | `0x7177a6867296406881E20d6647232314736Dd09A` | Agent identity |
| ReputationRegistry | `0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322` | ERC-8004 scores |
| ValidationRegistry | `0x092E03199625c780DD768007a2b90c72e2BF8dB9` | Score validation |

### Provider Agent Stack

- **Framework:** Next.js 15.5.6 + React 19
- **Blockchain:** ethers.js v6
- **TEE Integration:** iExec SDK + DataProtector
- **Reputation:** ERC-8004 standard (ChaosChain)
- **Animation:** Framer Motion + custom Waves

### Key Features

**1. Autonomous Job Processing**
```typescript
// Auto-detects and processes new jobs
const events = await contract.queryFilter(
  contract.filters.JobCreated(),
  fromBlock,
  toBlock
);
```

**2. Confidential Computation**
```typescript
// Protected data in iExec TEE
const protectedData = await dataProtector.protectData({
  data: { agentAddress }
});
```

**3. On-Chain Reputation**
```typescript
// Publish to ERC-8004
await reputationRegistry.giveFeedback(
  agentId,
  score,
  encodeBytes32String('giza-score'),
  fileuri,
  filehash,
  auth
);
```

---

## 📊 Demo & Testing

### Live Demo
- **URL:** [bondai-demo.vercel.app](https://bond-ai-liart.vercel.app/)
- **Network:** Base Sepolia (Chain ID: 84532)
- **Status:** ✅ Live and processing jobs

### Testing Guide

Full testing instructions available in [docs/testing-guide.md](./docs/testing-guide.md)

**Quick Start:**
1. Visit the demo dashboard
2. View deployed contracts section
3. Create a job via ACP contract
4. Watch autonomous processing in real-time
5. Verify score on ERC-8004 registry

### Transaction Examples

- **First Agent Registration:** [BaseScan](https://sepolia.basescan.org/tx/0x6e0baaf16d4425400a8346592f5d27fb5980e7d5ce75ce9ed2a31d0f9a3a7d21)
- **First Feedback:** [BaseScan](https://sepolia.basescan.org/tx/0x1d485c5e1063443a67487f67c1a17dff8077aa9f53f718db83d2a2415a9b7cea )
- **Job Processing:** [BaseScan](https://sepolia.basescan.org/tx/0x10a49258be5d4cc914a965c69893e1d9e7ad9af1d2f9e92b4ab2c003df07cac4)

---

## 🎨 User Experience

### Dashboard Features

- **Real-time Job Queue** - Live processing status
- **Activity Log** - All events and transactions
- **Contract Links** - Quick access to deployed contracts
- **Interactive Animations** - TrueFocus title + Waves background
- **Responsive Design** - Mobile-first approach

### For Developers

- **Standardized Agent Adapter** - Easy integration for any agent
- **SDK (Coming Soon)** - Simple API for agent scoring
- **Documentation** - Comprehensive guides and examples

---

## 🔮 Future Roadmap

### Phase 1: Infrastructure (✅ Complete)
- [x] Virtuals ACP integration
- [x] iExec TEE scoring pipeline
- [x] ERC-8004 reputation publishing
- [x] Provider agent automation

### Phase 2: SDK & Platform (Q1 2025)
- [ ] BondAI SDK for agent developers
- [ ] Multi-agent support (Giza, Morpheus, Autonolas)
- [ ] Advanced scoring models
- [ ] Dashboard analytics

### Phase 3: BondAVS Credit (Q2 2025)
- [ ] Credit underwriting smart contracts
- [ ] Agent credit line pools
- [ ] Reputation-weighted interest rates
- [ ] Default insurance mechanisms

### Phase 4: Ecosystem Growth (Q3 2025)
- [ ] Multi-chain expansion (Ethereum, Arbitrum, Optimism)
- [ ] Partnership with DeFi protocols
- [ ] Institutional credit facilities
- [ ] DAO governance

---

## 👥 Team

**Built by bond.credit team**
- Decentralized credit infrastructure specialists
- AI x Web3 integration experts
- Committed to building the agentic economy

*Developed by @ojasarora.eth*
- GitHub: [github.com/ojasarora77](https://github.com/ojasarora77)
- Decentralized credit infrastructure specialist
- AI x Web3 integration expert
---

## 📝 Documentation

- **Main Docs:** [bond.credit](https://bond.credit)
- **Testing Guide:** [docs/testing-guide.md](./docs/testing-guide.md)
- **Architecture:** [docs/architecture.md](./docs/architecture.md)
- **GitHub:** [github.com/bond-dot-credit/BondAI](https://github.com/bond-dot-credit/BondAI)

---

## 🏆 Why BondAI Should Win

### Technical Excellence
- ✅ Complex multi-chain integration (Base + Bellecour)
- ✅ Production-ready autonomous agent system
- ✅ Novel use of TEE for agent reputation
- ✅ First implementation of ERC-8004 for AI agents

### Real-World Impact
- 💰 Unlocks capital access for AI agents
- 🌍 Enables scalable agentic economy
- 🔒 Privacy-preserving reputation system
- 📈 Creates new DeFi primitive (agent credit)

### Innovation
- 🆕 First Virtuals ACP + iExec + ERC-8004 integration
- 🆕 Novel credit scoring model for autonomous agents
- 🆕 Bridge between agent performance and capital markets
- 🆕 Standardized reputation for the AI agent ecosystem

### Ecosystem Alignment
- 🎯 Perfect fit for Virtuals Protocol vision
- 🎯 Enables agent commerce at scale
- 🎯 Provides infrastructure for all agents
- 🎯 Can become core ACP service

---

## 🔗 Links

- **Website:** [bond.credit](https://bond.credit)
- **Demo:** [bondai-demo.vercel.app](https://bondai-demo.vercel.app)
- **GitHub:** [github.com/bond-dot-credit/BondAI](https://github.com/bond-dot-credit/BondAI)
- **Twitter:** [@bondcredit](https://twitter.com/bondcredit)
- **Discord:** [Join our community](https://discord.gg/bondcredit)

---

**Built with ❤️ for the Virtuals x Ethereum AI Hackathon**

*Empowering AI agents to build credit, access capital, and scale the agentic economy.*
