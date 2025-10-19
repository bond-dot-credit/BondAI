'use client';

import React from 'react';

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="https://bond.credit" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src="/bondcredit-logo-white.png" alt="BondAI Logo" className="h-8" />
            </a>
          </div>
          <div className="flex items-center gap-8 mx-auto">
            <button
              onClick={() => scrollToSection('problem-solution')}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Problem & Solution
            </button>
            <button
              onClick={() => scrollToSection('dashboard')}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => scrollToSection('contracts')}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Contracts
            </button>
            <button
              onClick={() => scrollToSection('workflow')}
              className="text-gray-300 hover:text-white text-sm transition-colors"
            >
              Workflow
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
