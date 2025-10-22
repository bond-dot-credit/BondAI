import React from 'react';

const ContractLinks = () => {
  const contracts = [
    {
      name: 'IdentityRegistry',
      address: '0x7177a6867296406881E20d6647232314736Dd09A',
      network: 'Base Sepolia',
      explorer: 'https://sepolia.basescan.org/tx/0x6e0baaf16d4425400a8346592f5d27fb5980e7d5ce75ce9ed2a31d0f9a3a7d21',
      description: 'ERC-8004 agent identity (NFT minting)'
    },
    {
      name: 'ReputationRegistry',
      address: '0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322',
      network: 'Base Sepolia',
      explorer: 'https://sepolia.basescan.org/tx/0x1d485c5e1063443a67487f67c1a17dff8077aa9f53f718db83d2a2415a9b7cea',
      description: 'ERC-8004 reputation & credit scores(feedback)'
    },

    //TODO: Update with actual deployed contract addresse
    {
      name: 'ValidationRegistry',
      address: '0x092E03199625c780DD768007a2b90c72e2BF8dB9',
      network: 'Base Sepolia',
      explorer: 'https://sepolia.basescan.org/address/0x092E03199625c780DD768007a2b90c72e2BF8dB9',
      description: 'ERC-8004 validation & verification'
    },
    {
      name: 'Credit Scoring TEE App',
      address: '0x2d1003f88b918828ca2377020d218e8ed6092367',
      network: 'iExec Bellecour',
      explorer: 'https://explorer.iex.ec/bellecour/app/0x2d1003f88b918828ca2377020d218e8ed6092367',
      description: 'Confidential ML scoring in TEE'
    }
  ];

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Deployed Contracts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contracts.map((contract, index) => (
          <a
            key={index}
            href={contract.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-all duration-300 hover:scale-[1.02] group"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-sm text-white group-hover:text-purple-400 transition-colors">
                  {contract.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{contract.network}</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
            <div className="font-mono text-xs text-gray-400 mb-2 group-hover:text-purple-300 transition-colors">
              {truncateAddress(contract.address)}
            </div>
            <p className="text-xs text-gray-500">{contract.description}</p>
          </a>
        ))}
      </div>
      <div className="mt-4 p-3 bg-blue-900/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-blue-300">
            Click any contract to view on block explorer. All contracts are verified and open source.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContractLinks;
