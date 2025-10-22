import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import StorageIcon from '@mui/icons-material/Storage';

const ProblemSolution = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Problem Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Why AI Agents Need Credit Scores
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            AI agents require verifiable credit history to access capital markets and scale autonomous operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/20 rounded-xl p-6">
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: '#fca5a5', marginBottom: 2 }} />
            <h3 className="text-lg font-semibold mb-2 text-red-300">No Credit Access</h3>
            <p className="text-sm text-gray-400">
              AI agents cannot access lending protocols or credit facilities without verifiable on-chain reputation
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border border-orange-500/20 rounded-xl p-6">
            <LockIcon sx={{ fontSize: 40, color: '#fdba74', marginBottom: 2 }} />
            <h3 className="text-lg font-semibold mb-2 text-orange-300">Privacy vs Proof</h3>
            <p className="text-sm text-gray-400">
              Agents must expose sensitive operational data to prove creditworthiness, creating security risks
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-500/20 rounded-xl p-6">
            <HandshakeIcon sx={{ fontSize: 40, color: '#fde047', marginBottom: 2 }} />
            <h3 className="text-lg font-semibold mb-2 text-yellow-300">No Standard</h3>
            <p className="text-sm text-gray-400">
              Each protocol requires custom integration - no standardized reputation format across ecosystems
            </p>
          </div>
        </div>
      </div>

      {/* Solution Flow */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            How credit rating Works
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Three-step workflow: Register agent → Confidential scoring → On-chain reputation
          </p>
        </div>

        {/* Flowchart */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-green-500/50 hidden md:block" style={{ transform: 'translateY(-50%)' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/60 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-300 font-bold">
                  1
                </div>
                <PersonAddIcon sx={{ fontSize: 32, color: '#93c5fd' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-blue-300">Register Agent</h3>
              <p className="text-sm text-gray-400">
                Call IdentityRegistry.register() to mint agent NFT on-chain via ERC-8004 standard (ChaosChain infrastructure)
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0a0a0a] border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold">
                  2
                </div>
                <SecurityIcon sx={{ fontSize: 32, color: '#c084fc' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-purple-300">iExec TEE Scoring</h3>
              <p className="text-sm text-gray-400">
                Submit agent data to iExec TEE on Bellecour - proprietary ML algorithms compute credit score confidentially
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0a0a0a] border border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center text-green-300 font-bold">
                  3
                </div>
                <CheckCircleIcon sx={{ fontSize: 32, color: '#86efac' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-300">Submit Score</h3>
              <p className="text-sm text-gray-400">
                Call ReputationRegistry.giveFeedback() with TEE-verified score - stored on-chain via ERC-8004 for composability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Highlights */}
      <div className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 border border-purple-500/20 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Technology Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <StorageIcon sx={{ fontSize: 48, color: '#c084fc', marginBottom: 1.5 }} />
            <h4 className="font-semibold mb-2 text-purple-300">ERC-8004 Registry</h4>
            <p className="text-sm text-gray-400">
              ChaosChain infrastructure provides standardized identity and reputation contracts on Base Sepolia
            </p>
          </div>
          <div className="text-center">
            <SecurityIcon sx={{ fontSize: 48, color: '#60a5fa', marginBottom: 1.5 }} />
            <h4 className="font-semibold mb-2 text-blue-300">iExec TEE</h4>
            <p className="text-sm text-gray-400">
              Trusted Execution Environment runs proprietary credit scoring algorithms confidentially on Bellecour chain
            </p>
          </div>
          <div className="text-center">
            <BarChartIcon sx={{ fontSize: 48, color: '#86efac', marginBottom: 1.5 }} />
            <h4 className="font-semibold mb-2 text-green-300">On-Chain Composability</h4>
            <p className="text-sm text-gray-400">
              Credit scores stored via ERC-8004 standard enable DeFi protocols to query and use agent reputation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolution;
