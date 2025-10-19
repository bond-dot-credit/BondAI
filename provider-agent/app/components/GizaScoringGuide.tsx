import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ShieldIcon from '@mui/icons-material/Shield';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const GizaScoringGuide = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/20 rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-indigo-300">Run Giza Scoring in iExec TEE</h3>
        <a
          href="https://bond-credit-nextjs.midmoussi.workers.dev/iexec"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
        >
          <PlayCircleIcon />
          Launch Scoring Platform
          <OpenInNewIcon fontSize="small" />
        </a>
      </div>

      <p className="text-gray-400 mb-6">
        Our Giza ML scoring runs in iExec's Trusted Execution Environment on Bellecour chain. Follow these steps to generate a confidential credit score:
      </p>

      <div className="space-y-4">
        {/* Step 1 */}
        <div className="bg-[#0a0a0a] border border-indigo-500/20 rounded-lg p-4 hover:border-indigo-500/40 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-300 font-bold">1</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <AccountBalanceWalletIcon sx={{ fontSize: 20, color: '#a5b4fc' }} />
                <h4 className="font-semibold text-indigo-300">Connect Wallet</h4>
              </div>
              <p className="text-sm text-gray-400">
                Visit the scoring platform and connect your Web3 wallet (MetaMask, WalletConnect, etc.)
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#0a0a0a] border border-indigo-500/20 rounded-lg p-4 hover:border-indigo-500/40 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-300 font-bold">2</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <SwapHorizIcon sx={{ fontSize: 20, color: '#a5b4fc' }} />
                <h4 className="font-semibold text-indigo-300">Switch to iExec Bellecour</h4>
              </div>
              <p className="text-sm text-gray-400">
                Switch your wallet network to <span className="text-indigo-300 font-mono">iExec Bellecour</span> (Chain ID: 134)
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#0a0a0a] border border-indigo-500/20 rounded-lg p-4 hover:border-indigo-500/40 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-300 font-bold">3</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <ShieldIcon sx={{ fontSize: 20, color: '#a5b4fc' }} />
                <h4 className="font-semibold text-indigo-300">Create Protected Data</h4>
              </div>
              <p className="text-sm text-gray-400">
                Upload your agent's behavioral data as protected data - it will be encrypted and only accessible inside the TEE
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-[#0a0a0a] border border-indigo-500/20 rounded-lg p-4 hover:border-indigo-500/40 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-300 font-bold">4</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <PlayCircleIcon sx={{ fontSize: 20, color: '#a5b4fc' }} />
                <h4 className="font-semibold text-indigo-300">Run TEE Computation</h4>
              </div>
              <p className="text-sm text-gray-400">
                Sign a few transactions to authorize the iExec TEE computation. The Giza ML model will score your agent confidentially
              </p>
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-[#0a0a0a] border border-indigo-500/20 rounded-lg p-4 hover:border-indigo-500/40 transition-all">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-300 font-bold">5</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <AssessmentIcon sx={{ fontSize: 20, color: '#a5b4fc' }} />
                <h4 className="font-semibold text-indigo-300">Score Published</h4>
              </div>
              <p className="text-sm text-gray-400">
                The credit score is computed and used to rate agents in the ERC-8004 Reputation Registry. This is a <span className="text-purple-300 font-semibold">Proof of Concept</span> - full integration coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-purple-300">Note:</span> This scoring platform demonstrates the TEE computation flow. In production, this process will be fully automated through the Provider Agent workflow shown above.
        </p>
      </div>
    </div>
  );
};

export default GizaScoringGuide;
