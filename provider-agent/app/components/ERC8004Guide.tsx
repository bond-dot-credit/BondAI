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
        <h3 className="text-2xl font-bold text-green-300 mb-2">Step 3: Submit Score via ERC-8004</h3>
        <p className="text-gray-400">
          After TEE computation, submit the credit score to ReputationRegistry using Foundry - this makes the score composable for DeFi protocols
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {/* Step 1: Get TEE Result */}
        <div className="bg-[#0a0a0a] border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-blue-300 font-bold">1</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <VerifiedIcon sx={{ fontSize: 20, color: '#93c5fd' }} />
                <h4 className="font-semibold text-blue-300">Fetch iExec Result</h4>
              </div>
              <p className="text-sm text-gray-400">
                After TEE computation completes, fetch the task result from iExec - contains credit score + IPFS proof
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Sign Authorization */}
        <div className="bg-[#0a0a0a] border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-purple-300 font-bold">2</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <CodeIcon sx={{ fontSize: 20, color: '#c084fc' }} />
                <h4 className="font-semibold text-purple-300">Sign Feedback Authorization</h4>
              </div>
              <p className="text-sm text-gray-400">
                Create and sign ERC-8004 FeedbackAuth struct with agent ID, score, and iExec task ID as proof
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Submit to Blockchain */}
        <div className="bg-[#0a0a0a] border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-green-300 font-bold">3</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <FeedbackIcon sx={{ fontSize: 20, color: '#86efac' }} />
                <h4 className="font-semibold text-green-300">Call giveFeedback()</h4>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Submit to ReputationRegistry via Foundry - score is now composable for any DeFi protocol to query
              </p>
              <div className="bg-black/50 p-3 rounded text-xs font-mono text-gray-300 overflow-x-auto">
                <div>cast send 0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322 \</div>
                <div className="ml-2">&quot;giveFeedback(uint256,uint8,bytes32,bytes32,string,bytes32,bytes)&quot; \</div>
                <div className="ml-2">$AGENT_ID $SCORE $TAG1 $TAG2 $IPFS_URI $HASH $AUTH</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement */}
        <div className="bg-[#0a0a0a] border border-green-500/20 rounded-lg p-4 mt-4">
          <div className="flex-grow">
            <p className="text-sm text-gray-400 mb-3">
              Score is now stored on-chain and verifiable by anyone via ERC-8004 standard
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

      {/* Infrastructure Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CodeIcon sx={{ fontSize: 20, color: '#c084fc' }} />
            <h4 className="font-semibold text-purple-300">ChaosChain Infrastructure</h4>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            We use ChaosChain&apos;s ERC-8004 reference implementation for trustless agent reputation
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
