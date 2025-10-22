'use client';

import { useEffect, useState } from 'react';
import ClientOnly from './components/ClientOnly';
import JobQueueTable from './components/JobQueueTable';
import ScoreDistributionChart from './components/ScoreDistributionChart';
import JobsOverTimeChart from './components/JobsOverTimeChart';
import ProcessingTimeChart from './components/ProcessingTimeChart';
import RevenueChart from './components/RevenueChart';
import Waves from './components/Waves';
import TrueFocus from './components/TrueFocus';
import MagicBento from './components/MagicBento';
import ContractLinks from './components/ContractLinks';
import InfoSection from './components/InfoSection';
import ProblemSolution from './components/ProblemSolution';
import GizaScoringGuide from './components/GizaScoringGuide';
import ERC8004Guide from './components/ERC8004Guide';
import WorkflowOverview from './components/WorkflowOverview';

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    rejectedJobs: 0
  });

  useEffect(() => {
    // Start ACP listener via API route (server-side)
    const initListener = async () => {
      try {
        const response = await fetch('/api/start-listener', { method: 'POST' });
        const data = await response.json();

        if (data.success) {
          setLogs(prev => [...prev, `✅ ${data.message}`]);
        } else {
          setLogs(prev => [...prev, `❌ Error: ${data.error}`]);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Failed to start ACP listener:', error);
        setLogs(prev => [...prev, `❌ Error: ${errorMessage}`]);
      }
    };

    // Fetch job stats
    const fetchJobStats = async () => {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobStats(data);
      } catch (error) {
        console.error('Failed to fetch job stats:', error);
      }
    };

    initListener();
    fetchJobStats();

    // Poll for status and stats updates every 5 seconds
    const interval = setInterval(async () => {
      try {
        const jobsRes = await fetch('/api/jobs');
        const jobsData = await jobsRes.json();
        setJobStats(jobsData);
      } catch (error) {
        console.error('Failed to update stats:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section with Waves Background */}
      <div className="relative bg-black py-20 min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <ClientOnly>
            <Waves
              lineColor="rgba(96, 165, 250, 0.3)"
              backgroundColor="transparent"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={40}
              waveAmpY={20}
              friction={0.9}
              tension={0.01}
              maxCursorMove={120}
              xGap={12}
              yGap={36}
            />
          </ClientOnly>
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side - Text content */}
            <div className="md:w-1/2 space-y-8">
                <div className="flex justify-center md:justify-start">
                <img
                  src="/bondcredit-logo-white.png"
                  alt="bond.credit"
                  className="h-10 md:h-12 lg:h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
                />
                </div>
              <div className="text-center md:text-left space-y-4">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Credit Scoring Infrastructure for AI Agents
                </p>
                <p className="text-base md:text-lg text-gray-400">
                  Confidential scoring via iExec TEE • On-chain reputation via ERC-8004 • ChaosChain infrastructure
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a href="#dashboard" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all font-medium">
                  View Dashboard
                </a>
                <a href="https://github.com/bond-dot-credit/BondAI/blob/main/docs/testing-guide.md" target="_blank" rel="noopener noreferrer" className="border border-blue-500 text-blue-400 px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all font-medium">
                  Documentation
                </a>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                {/* <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                  Base Sepolia
                </div>
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-sm flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live
                </div> */}
              </div>
            </div>

            {/* Right side - Quick Access Links */}
            <div className="md:w-1/2">
              <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-xl border border-slate-700/50 p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">Quick Access</h3>
                  <p className="text-sm text-slate-400">ERC-8004 contracts and resources</p>
                </div>

                <div className="space-y-3">
                  {/* Main Website */}
                  <a
                    href="https://bond.credit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-blue-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">bond.credit</p>
                        <p className="text-xs text-slate-400">Main platform</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {/* Identity Registry */}
                  <a
                    href="https://sepolia.basescan.org/address/0x7177a6867296406881E20d6647232314736Dd09A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-purple-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">Identity Registry</p>
                        <p className="text-xs text-slate-400 font-mono">0x7177...d09A</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {/* Reputation Registry */}
                  <a
                    href="https://sepolia.basescan.org/address/0xB5048e3ef1DA4E04deB6f7d0423D06F63869e322"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-emerald-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">Reputation Registry</p>
                        <p className="text-xs text-slate-400 font-mono">0xB504...e322</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {/* GitHub */}
                  <a
                    href="https://github.com/bond-dot-credit/BondAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-white">GitHub Repository</p>
                        <p className="text-xs text-slate-400">View source code</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem & Solution Section */}
      <div id="problem-solution" className="-mt-8">
        <ProblemSolution />
      </div>

      {/* Main Dashboard */}
      <div id="dashboard" className="max-w-[1920px] w-full mx-auto px-6 py-8">
        <div className="mb-8">
          <MagicBento jobStats={jobStats} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Processing Time</h3>
            <div className="aspect-[16/9] w-full">
              <ProcessingTimeChart />
            </div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Revenue</h3>
            <div className="aspect-[16/9] w-full">
              <RevenueChart />
            </div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
            <div className="aspect-[16/9] w-full">
              <ScoreDistributionChart />
            </div>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Jobs Over Time</h3>
            <div className="aspect-[16/9] w-full">
              <JobsOverTimeChart />
            </div>
          </div>
        </div>

        {/* Job Queue and Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Job Queue */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6">
              <h2 className="text-lg font-semibold mb-4">Job Queue</h2>
              <JobQueueTable />
            </div>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6 h-full">
              <h2 className="text-lg font-semibold mb-4">Activity Log</h2>
              <div className="space-y-2 text-sm">
                {logs.slice(-5).map((log, i) => (
                  <div key={i} className="text-gray-400">{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contract Links */}
        <div id="contracts" className="mt-8">
          <div className="bg-[#060010] border border-[#392e4e] rounded-[20px] p-6 hover:-translate-y-0.5 transition-all duration-300">
            <ContractLinks />
          </div>
        </div>

        {/* Workflow Overview */}
        <div id="workflow" className="mt-8">
          <WorkflowOverview />
        </div>

        {/* Step 1: Create Job */}
        <div className="mt-8">
          <InfoSection />
        </div>

        {/* Step 2: Giza Scoring */}
        <div className="mt-8">
          <GizaScoringGuide />
        </div>

        {/* Step 3: ERC-8004 */}
        <div className="mt-8">
          <ERC8004Guide />
        </div>
      </div>
    </main>
  );
}
