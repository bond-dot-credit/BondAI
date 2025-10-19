import React from 'react';

const hardcodedJobs = [
  { id: 3, agentAddress: '0x289F...3cBB', client: '0x7Ae4...82f1', status: 'Completed', score: '87/100', processingTime: '8.2s', timestamp: '2h ago' },
  { id: 2, agentAddress: '0x9Bc2...4a3d', client: '0xClie...def', status: 'Completed', score: '92/100', processingTime: '9.1s', timestamp: '5h ago' },
  { id: 1, agentAddress: '0x7Ae4...82f1', client: '0xClie...abc', status: 'Request', score: '--', processingTime: '--', timestamp: '1d ago' },
];

const JobQueueTable = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800/50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">Agent</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">Client</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">Score</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/50 divide-y divide-gray-800">
            {hardcodedJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-white">#{job.id}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400 font-mono">{job.agentAddress}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400 font-mono">{job.client}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs">
                  <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                    job.status === 'Completed' ? 'bg-green-900/50 text-green-300' :
                    job.status === 'Failed' ? 'bg-red-900/50 text-red-300' :
                    'bg-blue-900/50 text-blue-300'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-white font-semibold">{job.score}</td>
                <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-400">{job.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobQueueTable;
