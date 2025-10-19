import React from 'react';

const InfoSection = () => {
  return (
    <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
      <h3 className="text-lg font-semibold mb-4">🔧 How to Create a Job</h3>
      <p className="text-sm text-gray-400 mb-4">
        To test bondAI and create a job for scoring an AI agent, follow these steps:
      </p>

      <div className="space-y-4">
        <div className="bg-[#060010] border border-purple-500/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Step 1: Get the ACP Smart Contracts</h4>
          <p className="text-sm text-gray-400 mb-2">
            Visit the Virtuals Protocol ACP contracts repository:
          </p>
          <a
            href="https://github.com/Virtual-Protocol/protocol-contracts/tree/main/contracts/acp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm inline-flex items-center gap-1"
          >
            📂 Virtual-Protocol/protocol-contracts/contracts/acp
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="bg-[#060010] border border-purple-500/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Step 2: Open Remix IDE</h4>
          <p className="text-sm text-gray-400 mb-2">
            Copy the ACP contract files (especially <code className="bg-black/50 px-1 py-0.5 rounded text-xs">ACPSimple.sol</code>) to{' '}
            <a
              href="https://remix.ethereum.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Remix IDE
            </a>
          </p>
        </div>

        <div className="bg-[#060010] border border-purple-500/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Step 3: Connect to Base Sepolia</h4>
          <p className="text-sm text-gray-400">
            In Remix, go to the <span className="text-purple-300">&quot;Deploy & Run Transactions&quot;</span> tab and:
          </p>
          <ul className="text-sm text-gray-400 list-disc list-inside mt-2 space-y-1 ml-2">
            <li>Set Environment to <code className="bg-black/50 px-1 py-0.5 rounded text-xs">Injected Provider - MetaMask</code></li>
            <li>Connect to <span className="text-blue-300">Base Sepolia</span> network</li>
            <li>Paste our ACPSimple contract address: <code className="bg-black/50 px-1 py-0.5 rounded text-xs">0x959591Bab069599cAbb2A72AA371503ba2d042FF</code></li>
            <li>Click <span className="text-orange-300">&quot;At Address&quot;</span> to load the deployed contract</li>
          </ul>
        </div>

        <div className="bg-[#060010] border border-purple-500/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Step 4: Execute a Job</h4>
          <p className="text-sm text-gray-400 mb-2">
            Call the <code className="bg-black/50 px-1 py-0.5 rounded text-xs">createJob</code> function with:
          </p>
          <ul className="text-sm text-gray-400 list-disc list-inside mt-2 space-y-1 ml-2">
            <li><strong>provider:</strong> <code className="bg-black/50 px-1 py-0.5 rounded text-xs">0x4B823edEAb2cD386E889a7084E3b16231Bda70de</code> (our Provider Agent)</li>
            <li><strong>evaluator:</strong> <code className="bg-black/50 px-1 py-0.5 rounded text-xs">0x0000000000000000000000000000000000000000</code> (zero address)</li>
            <li><strong>expiredAt:</strong> Any future timestamp (e.g., <code className="bg-black/50 px-1 py-0.5 rounded text-xs">9999999999</code>)</li>
          </ul>
          <p className="text-sm text-gray-400 mt-2">
            Our Provider Agent will automatically detect the new job and start processing it!
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 italic">
        📖 For more details, see{' '}
        <a
          href="https://github.com/bond-dot-credit/virtuals-hackathon/blob/dev-ojas/docs/testing-guide.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          <code className="bg-black/50 px-1 py-0.5 rounded">docs/testing-guide.md</code>
        </a>
      </p>
    </div>
  );
};

export default InfoSection;
