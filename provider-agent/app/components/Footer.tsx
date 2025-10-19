import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-transparent to-gray-900/50 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <a href="https://bond.credit" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/bondcredit-logo-white.png" alt="BondAI Logo" className="h-6" />
            </a>
            <span className="text-gray-400 text-sm">© 2025 BondAI - Verifiable Reputation for Autonomous Agents</span>
          </div>

          <a
            href="https://bond.credit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
          >
            Visit bond.credit
            <OpenInNewIcon fontSize="small" />
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800/50 text-center">
          <p className="text-xs text-gray-500">
            Built with Virtuals ACP, iExec TEE, ERC-8004, and X402 • Hackathon Demo
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
