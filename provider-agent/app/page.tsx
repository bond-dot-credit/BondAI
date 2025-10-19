'use client';

import { useEffect, useState } from 'react';
import ClientOnly from './components/ClientOnly';
import PixelBlast from './components/PixelBlast';
import JobQueueTable from './components/JobQueueTable';
import ActivityLog from './components/ActivityLog';
import ScoreDistributionChart from './components/ScoreDistributionChart';
import JobsOverTimeChart from './components/JobsOverTimeChart';
import ProcessingTimeChart from './components/ProcessingTimeChart';
import RevenueChart from './components/RevenueChart';
import MagicBento from './components/MagicBento';

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
      <div className="relative h-[400px] w-full">
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
            liquid={false}
            liquidStrength={0.12}
            liquidRadius={1.2}
            liquidWobbleSpeed={5}
            speed={0.6}
            edgeFade={0.25}
            transparent
          />
        </ClientOnly>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold">Provider Agent</h1>
            <p className="mt-4 text-2xl">ERC-8004 Score-as-a-Service</p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className={`h-3 w-3 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm">{isListening ? 'Listening for jobs' : 'Initializing...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <JobQueueTable />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <ScoreDistributionChart />
              <JobsOverTimeChart />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <ProcessingTimeChart />
              <RevenueChart />
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Manual Job Processing</h3>
              <p className="text-sm text-gray-400 mb-4">
                The listener only detects new jobs. Process existing Job ID 1 manually:
              </p>
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
          <div className="lg:col-span-1">
            <ActivityLog />
          </div>
        </div>
      </div>
    </main>
  );
}