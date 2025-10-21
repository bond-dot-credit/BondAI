import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const WorkflowOverview = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 border border-blue-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <PlayArrowIcon sx={{ fontSize: 28, color: '#60a5fa' }} />
        <h3 className="text-xl font-bold text-blue-300">How to Use bondAI</h3>
      </div>
      <p className="text-gray-300 mb-4">
        Follow these steps to get a verifiable credit score for any AI agent:
      </p>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg px-4 py-2">
          <span className="font-semibold text-blue-300">1. Register Agent (ERC-8004)</span>
        </div>
        <ArrowForwardIcon sx={{ fontSize: 20, color: '#60a5fa' }} className="hidden md:block" />
        <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-lg px-4 py-2">
          <span className="font-semibold text-purple-300">2. iExec TEE Computation</span>
        </div>
        <ArrowForwardIcon sx={{ fontSize: 20, color: '#c084fc' }} className="hidden md:block" />
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2">
          <span className="font-semibold text-green-300">3. Submit Score (ERC-8004)</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4 italic">
        Scroll down for detailed instructions on each step
      </p>
    </div>
  );
};

export default WorkflowOverview;
