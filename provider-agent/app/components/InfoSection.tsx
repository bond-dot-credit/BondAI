import React from 'react';

const InfoSection = () => {
  return (
    <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
      <h3 className="text-lg font-semibold mb-4">🔧 Step 1: Register Your Agent</h3>
      <p className="text-sm text-gray-400 mb-4">
        Before scoring, agents must be registered in the ERC-8004 IdentityRegistry contract:
      </p>

      <div className="space-y-4">
        <div className="bg-[#060010] border border-purple-500/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Get ERC-8004 Contracts</h4>
          <p className="text-sm text-gray-400 mb-2">
            Visit the ChaosChain ERC-8004 reference implementation:
          </p>
          <a
            href="https://github.com/ChaosChain/trustless-agents-erc-ri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm inline-flex items-center gap-1"
          >
            📂 ChaosChain/trustless-agents-erc-ri
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <div className="bg-[#060010] border border-purple-500/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Use Foundry to Register</h4>
          <p className="text-sm text-gray-400 mb-2">
            Call <code className="bg-black/50 px-1 py-0.5 rounded text-xs">IdentityRegistry.register()</code> via Foundry:
          </p>
          <div className="bg-black/50 p-3 rounded text-xs font-mono text-gray-300 overflow-x-auto">
            <div>cast send 0x7177a6867296406881E20d6647232314736Dd09A \</div>
            <div className="ml-2">&quot;register()&quot; \</div>
            <div className="ml-2">--rpc-url https://sepolia.base.org \</div>
            <div className="ml-2">--private-key $PRIVATE_KEY</div>
          </div>
        </div>

        <div className="bg-[#060010] border border-purple-500/10 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-purple-300 mb-2">Get Your Agent ID</h4>
          <p className="text-sm text-gray-400">
            After registration, you receive an agent NFT with a unique ID. Use this ID for all subsequent scoring operations.
          </p>
          <ul className="text-sm text-gray-400 list-disc list-inside mt-2 space-y-1 ml-2">
            <li>IdentityRegistry: <code className="bg-black/50 px-1 py-0.5 rounded text-xs">0x7177a6867296406881E20d6647232314736Dd09A</code></li>
            <li>Check events for your <code className="bg-black/50 px-1 py-0.5 rounded text-xs">Registered</code> event</li>
            <li>Extract <code className="bg-black/50 px-1 py-0.5 rounded text-xs">agentId</code> from event logs</li>
          </ul>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 italic">
        📖 For contract details, see{' '}
        <a
          href="https://github.com/ChaosChain/trustless-agents-erc-ri/blob/main/src/IdentityRegistry.sol"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          IdentityRegistry.sol
        </a>
      </p>
    </div>
  );
};

export default InfoSection;
