'use client';

import React, { useEffect, useState } from 'react';

interface LogEntry {
  time: string;
  icon: string;
  message: string;
}

const ActivityLog = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('/api/activity-log');
        const data = await response.json();
        setLogs(data.logs || []);
      } catch (error) {
        console.error('Failed to fetch activity log:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
      <div className="h-[60vh] overflow-y-auto font-mono text-xs">
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : logs.length === 0 ? (
          <div className="text-gray-400">No activity yet</div>
        ) : (
          <div>
            {logs.map((log, i) => (
              <div key={i} className="mb-2 text-gray-400 flex items-start">
                <span className="mr-2">{log.time}</span>
                <span className="mr-2">{log.icon}</span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
