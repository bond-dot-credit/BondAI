import React from 'react';

const logs = [
  { time: '00:24:15', icon: '✅', message: 'Job #142 completed: Score 87/100' },
  { time: '00:23:58', icon: '📋', message: 'Fetching iExec orders for Job #142' },
  { time: '00:23:45', icon: '🔐', message: 'Protected data created for 0x289F...3cBB' },
  { time: '00:23:30', icon: '🆕', message: 'New job #142 detected from 0xClient...' },
  { time: '00:22:10', icon: '✅', message: 'Job #141 published to ReputationRegistry' },
];

const ActivityLog = () => {
  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-4">Activity Log</h3>
      <div className="h-[60vh] overflow-y-auto font-mono text-xs">
        {logs.map((log, i) => (
          <div key={i} className="mb-2 text-gray-400 flex items-start">
            <span className="mr-2">{log.time}</span>
            <span className="mr-2">{log.icon}</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
