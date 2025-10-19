import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';

const hardcodedLogs = [
  { time: '14:24:15', icon: <CheckCircleIcon sx={{ fontSize: 16, color: '#86efac' }} />, message: 'Job #3 completed: Score 87/100 published to ERC-8004', color: 'text-green-300' },
  { time: '14:23:58', icon: <SecurityIcon sx={{ fontSize: 16, color: '#c084fc' }} />, message: 'TEE computation running for Job #3', color: 'text-purple-300' },
  { time: '14:23:45', icon: <CloudUploadIcon sx={{ fontSize: 16, color: '#60a5fa' }} />, message: 'Protected data created for 0x289F...3cBB', color: 'text-blue-300' },
  { time: '14:23:30', icon: <FiberNewIcon sx={{ fontSize: 16, color: '#fbbf24' }} />, message: 'New job #3 detected from 0x7Ae4...82f1', color: 'text-yellow-300' },
  { time: '10:18:22', icon: <CheckCircleIcon sx={{ fontSize: 16, color: '#86efac' }} />, message: 'Job #2 completed: Score 92/100', color: 'text-green-300' },
  { time: '10:18:10', icon: <SecurityIcon sx={{ fontSize: 16, color: '#c084fc' }} />, message: 'Giza scoring in TEE for Job #2', color: 'text-purple-300' },
];

const ActivityLog = () => {
  return (
    <div className="h-full">
      <div className="max-h-[400px] overflow-y-auto font-mono text-xs space-y-2 pr-2">
        {hardcodedLogs.map((log, i) => (
          <div key={i} className="flex items-start gap-2 p-2 rounded hover:bg-gray-800/30 transition-colors">
            <span className="text-gray-500 flex-shrink-0">{log.time}</span>
            <span className="flex-shrink-0 mt-0.5">{log.icon}</span>
            <span className={`${log.color} leading-relaxed`}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
