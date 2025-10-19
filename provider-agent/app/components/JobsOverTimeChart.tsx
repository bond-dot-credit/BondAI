'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '7 days ago', jobs: 120 },
  { name: '6 days ago', jobs: 130 },
  { name: '5 days ago', jobs: 110 },
  { name: '4 days ago', jobs: 140 },
  { name: '3 days ago', jobs: 150 },
  { name: '2 days ago', jobs: 130 },
  { name: 'Yesterday', jobs: 160 },
  { name: 'Today', jobs: 170 },
];

const JobsOverTimeChart = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Jobs Over Time (7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="name" stroke="#A8A8B8" />
          <YAxis stroke="#A8A8B8" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #4A4A4A' }} />
          <Legend wrapperStyle={{ color: '#A8A8B8' }} />
          <Line type="monotone" dataKey="jobs" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobsOverTimeChart;
