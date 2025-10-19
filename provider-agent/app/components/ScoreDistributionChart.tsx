'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '0-20', jobs: 2 },
  { name: '21-40', jobs: 5 },
  { name: '41-60', jobs: 18 },
  { name: '61-80', jobs: 45 },
  { name: '81-100', jobs: 30 },
];

const ScoreDistributionChart = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Score Distribution (Last 100 Jobs)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="name" stroke="#A8A8B8" />
          <YAxis stroke="#A8A8B8" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #4A4A4A' }} />
          <Legend wrapperStyle={{ color: '#A8A8B8' }} />
          <Bar dataKey="jobs" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreDistributionChart;
