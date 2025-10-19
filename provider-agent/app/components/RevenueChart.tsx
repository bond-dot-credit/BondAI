'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', revenue: 1200, bonus: 200 },
  { name: 'Week 2', revenue: 1500, bonus: 300 },
  { name: 'Week 3', revenue: 1800, bonus: 350 },
  { name: 'Week 4', revenue: 2200, bonus: 400 },
  { name: 'Current', revenue: 2500, bonus: 500 },
];

const RevenueChart = () => {
  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-4">Revenue Over Time (30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="name" stroke="#A8A8B8" />
          <YAxis stroke="#A8A8B8" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #4A4A4A' }} />
          <Legend wrapperStyle={{ color: '#A8A8B8' }} />
          <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Base Revenue" />
          <Area type="monotone" dataKey="bonus" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Performance Bonus" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
