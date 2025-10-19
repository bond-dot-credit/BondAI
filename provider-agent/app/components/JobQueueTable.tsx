import React from 'react';

const jobs = [
  { id: 142, agentAddress: '0x289F...3cBB', client: '0x7Ae4...82f1', status: 'Running in TEE', score: '--', processingTime: '5.2s', timestamp: '1m ago' },
  { id: 141, agentAddress: '0x7Ae4...82f1', client: '0xClient...abc', status: 'Completed', score: '87/100', processingTime: '8.2s', timestamp: '2h ago' },
  { id: 140, agentAddress: '0x9Bc2...4a3d', client: '0xClient...def', status: 'Completed', score: '92/100', processingTime: '9.1s', timestamp: '3h ago' },
  { id: 139, agentAddress: '0x...4a3d', client: '0xClient...ghi', status: 'Failed', score: '--', processingTime: '10.5s', timestamp: '4h ago' },
];

const JobQueueTable = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Job Queue</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Job ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Agent Address</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Client</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Processing Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-800">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">#{job.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{job.agentAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{job.client}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${job.status === 'Completed' ? 'bg-green-900 text-green-300' : job.status === 'Failed' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{job.score}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{job.processingTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{job.timestamp}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-purple-400 hover:text-purple-300">View Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobQueueTable;
