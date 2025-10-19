import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BoltIcon from '@mui/icons-material/Bolt';
import DescriptionIcon from '@mui/icons-material/Description';
import HeadsetIcon from '@mui/icons-material/Headset';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaymentIcon from '@mui/icons-material/Payment';

const ProblemSolution = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Problem Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            The Problem
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-4">
            AI agents need verifiable reputation to build trust in autonomous economies
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto">
            Without verifiable credit, AI agents cannot capitalize and scale the agentic economy. BondAI is the butler that helps rate agents - an SDK that routes scoring through our channels, providing users with agent-powered yield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/20 rounded-xl p-6">
            <LockIcon sx={{ fontSize: 40, color: '#fca5a5', marginBottom: 2 }} />
            <h3 className="text-lg font-semibold mb-2 text-red-300">No Trust Framework</h3>
            <p className="text-sm text-gray-400">
              AI agents need verifiable reputation to build trust in autonomous economies, but lack standardized metrics
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-500/20 rounded-xl p-6">
            <HandshakeIcon sx={{ fontSize: 40, color: '#fdba74', marginBottom: 2 }} />
            <h3 className="text-lg font-semibold mb-2 text-orange-300">Credit Gap</h3>
            <p className="text-sm text-gray-400">
              AI agents need verifiable credits to capitalize and scale the agentic economy - without it, growth is limited
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-500/20 rounded-xl p-6">
            <BoltIcon sx={{ fontSize: 40, color: '#fde047', marginBottom: 2 }} />
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">Data Standardization</h3>
            <p className="text-sm text-gray-400">
              Agents need to provide standardized metrics and metadata through our adapter for accurate rating
            </p>
          </div>
        </div>
      </div>

      {/* Solution Flow */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Our Solution
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-4">
            Verified, confidential agent scoring delivered autonomously
          </p>
          <p className="text-base text-gray-500 max-w-3xl mx-auto mb-3">
            BondAI doesn&apos;t just provide a credit score - it provides additional reputation weighting for financial agents, enabling them to access capital markets and scale their operations.
          </p>
          <p className="text-sm text-gray-500 max-w-3xl mx-auto">
            Agents connect to BondAVS which underwrites credit lines backed by verifiable reputation scores. This creates a bridge between agent performance and real capital, enabling autonomous economic actors to access credit facilities based on their proven track record.
          </p>
        </div>

        {/* Flowchart */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-green-500/50 hidden md:block" style={{ transform: 'translateY(-50%)' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-300 font-bold">
                  1
                </div>
                <DescriptionIcon sx={{ fontSize: 32, color: '#93c5fd' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Client Creates Job</h3>
              <p className="text-sm text-gray-400">
                User submits a scoring request via Virtuals ACP contract on Base Sepolia with agent address
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0a0a0a] border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold">
                  2
                </div>
                <HeadsetIcon sx={{ fontSize: 32, color: '#c084fc' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-purple-300">Listener Detects</h3>
              <p className="text-sm text-gray-400">
                Provider Agent monitors JobCreated events and automatically picks up the new request
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0a0a0a] border border-pink-500/30 rounded-xl p-6 hover:border-pink-500/60 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-500/50 flex items-center justify-center text-pink-300 font-bold">
                  3
                </div>
                <SecurityIcon sx={{ fontSize: 32, color: '#f9a8d4' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-pink-300">TEE Computation</h3>
              <p className="text-sm text-gray-400">
                iExec TEE runs agentic inferance scoring in secure enclave - data stays encrypted throughout
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0a0a0a] border border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-300 font-bold">
                  4
                </div>
                <CheckCircleIcon sx={{ fontSize: 32, color: '#86efac' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-300">Publish Score</h3>
              <p className="text-sm text-gray-400">
                Reputation score published to ERC-8004 registry - verifiable and queryable by anyone
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Highlights */}
      <div className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Powered By</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <BoltIcon sx={{ fontSize: 48, color: '#c084fc', marginBottom: 1.5 }} />
            <h4 className="font-semibold mb-2 text-purple-300">Virtuals ACP</h4>
            <p className="text-sm text-gray-400">
              Agent Commerce Protocol orchestrates job lifecycle and payments on Base Sepolia
            </p>
          </div>
          <div className="text-center">
            <SecurityIcon sx={{ fontSize: 48, color: '#60a5fa', marginBottom: 1.5 }} />
            <h4 className="font-semibold mb-2 text-blue-300">iExec TEE</h4>
            <p className="text-sm text-gray-400">
              Trusted Execution Environment ensures confidential computation on Bellecour chain
            </p>
          </div>
          <div className="text-center">
            <BarChartIcon sx={{ fontSize: 48, color: '#86efac', marginBottom: 1.5 }} />
            <h4 className="font-semibold mb-2 text-green-300">ERC-8004</h4>
            <p className="text-sm text-gray-400">
              Standardized reputation registry makes scores portable across ecosystems
            </p>
          </div>
          <div className="text-center">
            <PaymentIcon sx={{ fontSize: 48, color: '#fbbf24', marginBottom: 1.5 }} />
            <h4 className="font-semibold mb-2 text-yellow-300">X402 Payments</h4>
            <p className="text-sm text-gray-400">
              Enables autonomous agentic payments for seamless credit line transactions
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-purple-500/20 text-center">
          <p className="text-sm text-gray-400">
            This infrastructure can evolve into a full product on Virtuals ACP, enabling any agent to access credit scoring services autonomously
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolution;
