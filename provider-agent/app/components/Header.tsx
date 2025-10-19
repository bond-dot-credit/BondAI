import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 bg-opacity-50 backdrop-blur-md z-10">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/bondcredit-logo-white.png" alt="BondCredit Logo" className="h-8" />
          </div>
          <div className="flex items-center">
            {/* Status Indicator */}
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></span>
              <span className="ml-2 text-green-400">Live</span>
            </div>
            {/* Network Badge */}
            <div className="ml-6">
              <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded-full">Base Sepolia</span>
            </div>
          </div>
          <div>
            {/* Wallet Connect */}
            <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700">
              Connect Wallet
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
