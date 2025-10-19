import React from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FeedbackIcon from '@mui/icons-material/Feedback';
import VerifiedIcon from '@mui/icons-material/Verified';
import CodeIcon from '@mui/icons-material/Code';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ERC8004Guide = () => {
  return (
    <div className="bg-gradient-to-br from-green-900/10 to-emerald-900/10 border border-green-500/20 rounded-xl p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-green-300 mb-2">ERC-8004 Reputation Registry</h3>
        <p className="text-gray-400">
          After scoring in the TEE, we publish results to the ERC-8004 reputation standard using ChaosChain's infrastructure on Base Sepolia
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {/* Step 1: ACP Job */}
        <div className="bg-[#0a0a0a] border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-300 font-bold">1</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <AppRegistrationIcon sx={{ fontSize: 20, color: '#93c5fd' }} />
                <h4 className="font-semibold text-blue-300">ACP Job Created</h4>
              </div>
              <p className="text-sm text-gray-400">
                Client creates a scoring job via Virtuals ACP contract on Base Sepolia
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: TEE Scoring */}
        <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-300 font-bold">2</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <VerifiedIcon sx={{ fontSize: 20, color: '#c084fc' }} />
                <h4 className="font-semibold text-purple-300">Giza TEE Computation</h4>
              </div>
              <p className="text-sm text-gray-400">
                iExec TEE runs Giza ML model confidentially on Bellecour chain and computes the credit score
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: ERC-8004 Publishing */}
        <div className="bg-[#0a0a0a] border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-green-300 font-bold">3</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <FeedbackIcon sx={{ fontSize: 20, color: '#86efac' }} />
                <h4 className="font-semibold text-green-300">Score Published to ERC-8004</h4>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                The score is published to the ERC-8004 Reputation Registry using ChaosChain's infrastructure, making it verifiable and portable across ecosystems
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircleIcon sx={{ fontSize: 16, color: '#86efac' }} />
                  <span className="text-gray-300">
                    <span className="font-semibold text-green-300">First on Base Sepolia:</span> We registered Giza agent
                  </span>
                  <a
                    href="https://sepolia.basescan.org/tx/0x6e0baaf16d4425400a8346592f5d27fb5980e7d5ce75ce9ed2a31d0f9a3a7d21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    View TX <OpenInNewIcon sx={{ fontSize: 12 }} />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircleIcon sx={{ fontSize: 16, color: '#86efac' }} />
                  <span className="text-gray-300">
                    <span className="font-semibold text-green-300">First Feedback:</span> We submitted the first agent feedback on Base Sepolia
                  </span>
                  <a
                    href="https://sepolia.basescan.org/tx/0x1d485c5e1063443a67487f67c1a17dff8077aa9f53f718db83d2a2415a9b7cea"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1"
                  >
                    View TX <OpenInNewIcon sx={{ fontSize: 12 }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Infrastructure Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CodeIcon sx={{ fontSize: 20, color: '#c084fc' }} />
            <h4 className="font-semibold text-purple-300">ChaosChain Infrastructure</h4>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            We use ChaosChain's ERC-8004 reference implementation for trustless agent reputation
          </p>
          <a
            href="https://github.com/ChaosChain/trustless-agents-erc-ri/tree/main/src"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm flex items-center gap-1"
          >
            <CodeIcon sx={{ fontSize: 16 }} />
            View on GitHub
            <OpenInNewIcon sx={{ fontSize: 14 }} />
          </a>
        </div>

        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <VerifiedIcon sx={{ fontSize: 20, color: '#86efac' }} />
            <h4 className="font-semibold text-green-300">Why ERC-8004?</h4>
          </div>
          <p className="text-sm text-gray-400">
            ERC-8004 provides a standardized way to store and query reputation scores on-chain, making agent creditworthiness portable and interoperable across DeFi protocols
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-blue-300">Innovation:</span> bondAI combines Virtuals ACP for job orchestration, iExec TEE for confidential computation, and ERC-8004 for standardized reputation - creating the first end-to-end privacy-preserving credit scoring service for AI agents.
        </p>
      </div>
    </div>
  );
};

export default ERC8004Guide;
