'use client';

import { useEffect, useState } from 'react';
import ClientOnly from './components/ClientOnly';
import JobQueueTable from './components/JobQueueTable';
import ActivityLog from './components/ActivityLog';
import ScoreDistributionChart from './components/ScoreDistributionChart';
import JobsOverTimeChart from './components/JobsOverTimeChart';
import ProcessingTimeChart from './components/ProcessingTimeChart';
import RevenueChart from './components/RevenueChart';
import PixelBlast from './components/PixelBlast';
import MagicBento from './components/MagicBento';
import HowItWorks from './components/HowItWorks';
import ContractLinks from './components/ContractLinks';

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
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
          setIsListening(true);
          setLogs(prev => [...prev, `✅ ${data.message}`]);
        } else {
          setLogs(prev => [...prev, `❌ Error: ${data.error}`]);
        }
      } catch (error: any) {
        console.error('Failed to start ACP listener:', error);
        setLogs(prev => [...prev, `❌ Error: ${error.message}`]);
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
        const [listenerRes, jobsRes] = await Promise.all([
          fetch('/api/start-listener'),
          fetch('/api/jobs')
        ]);

        const listenerData = await listenerRes.json();
        const jobsData = await jobsRes.json();

        setIsListening(listenerData.listening);
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
      <div className="relative bg-black">
        <div className="absolute inset-0 z-0">
          <ClientOnly>
            <PixelBlast
              variant="circle"
              pixelSize={6}
              color="#B19EEF"
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
        <div className="relative z-10 bg-gradient-to-b from-purple-900/20 to-transparent py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-2 leading-tight">Provider Agent</h1>
              <p className="text-lg text-gray-400">ERC-8004 Score-as-a-Service</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm">{isListening ? 'Listening for jobs' : 'Initializing...'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-[1920px] w-full mx-auto px-6 py-8">
        <div className="mt-8">
          <div className="bg-[#060010] border border-[#392e4e] rounded-[20px] p-6 hover:-translate-y-0.5 transition-all duration-300">
            <HowItWorks />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-sm text-gray-400">Total Jobs</h3>
            <p className="text-3xl font-bold">{jobStats.totalJobs}</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-sm text-gray-400">Active Jobs</h3>
            <p className="text-3xl font-bold text-yellow-400">{jobStats.activeJobs}</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-sm text-gray-400">Completed Jobs</h3>
            <p className="text-3xl font-bold text-green-400">{jobStats.completedJobs}</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl border border-purple-500/20 p-6 min-h-[120px] flex flex-col justify-between">
            <h3 className="text-sm text-gray-400">Rejected Jobs</h3>
            <p className="text-3xl font-bold text-red-400">{jobStats.rejectedJobs}</p>
          </div>
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
        <div className="mt-8">
          <div className="bg-[#060010] border border-[#392e4e] rounded-[20px] p-6 hover:-translate-y-0.5 transition-all duration-300">
            <ContractLinks />
          </div>
        </div>

        {/* Manual Job Processing */}
        <div className="mt-8">
          <div className="bg-[#060010] border border-[#392e4e] rounded-[20px] p-6 hover:-translate-y-0.5 transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">Manual Job Processing</h2>
            <p className="text-sm text-gray-400 mb-4">Process existing Job ID 1 manually:</p>
            <button
              onClick={async () => {
                setLogs(prev => [...prev, '⏳ Triggering Job ID 1 processing...']);
                try {
                  const res = await fetch('/api/process-job', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ jobId: 1 })
                  });
                  const data = await res.json();
                  setLogs(prev => [...prev, `✅ ${data.message}`]);
                } catch (error: any) {
                  setLogs(prev => [...prev, `❌ Error: ${error.message}`]);
                }
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Process Job ID 1
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}