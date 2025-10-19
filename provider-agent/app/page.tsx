'use client';

import { useEffect, useState } from 'react';
import ClientOnly from './components/ClientOnly';
import JobQueueTable from './components/JobQueueTable';
import ScoreDistributionChart from './components/ScoreDistributionChart';
import JobsOverTimeChart from './components/JobsOverTimeChart';
import ProcessingTimeChart from './components/ProcessingTimeChart';
import RevenueChart from './components/RevenueChart';
import PixelBlast from './components/PixelBlast';
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
      {/* Hero Section with 3D Background */}
      <div className="relative bg-black min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <ClientOnly>
            <PixelBlast
              variant="circle"
              pixelSize={6}
              color="#4A90E2" // Blue from logo
              patternScale={3}
              patternDensity={1.2}
              pixelSizeJitter={0.5}
              enableRipples={true}
              rippleSpeed={0.4}
              rippleThickness={0.12}
              rippleIntensityScale={1.5}
              liquid={true}
              liquidStrength={0.12}
              liquidRadius={1.2}
              liquidWobbleSpeed={5}
              speed={0.6}
              edgeFade={0.25}
              transparent
            />
          </ClientOnly>
        </div>
        <div className="relative z-10 w-full bg-gradient-to-b from-blue-900/20 via-purple-900/10 to-transparent py-16 pt-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                BondAI
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Decentralized Reputation Scoring for AI Agents
              </p>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                Powered by iExec TEE and ERC-8004 on Virtuals Protocol
              </p>
              <div className="flex justify-center gap-4 pt-6">
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm">
                  Base Sepolia
                </div>
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-300 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Live
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
