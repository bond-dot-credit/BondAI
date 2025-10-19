'use client';

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { time: '7 days ago', processingTime: 8.2 },
  { time: '6 days ago', processingTime: 9.1 },
  { time: '5 days ago', processingTime: 7.5 },
  { time: '4 days ago', processingTime: 8.5 },
  { time: '3 days ago', processingTime: 8.1 },
  { time: '2 days ago', processingTime: 7.9 },
  { time: 'Yesterday', processingTime: 8.3 },
  { time: 'Today', processingTime: 8.0 },
];

const ProcessingTimeChart = () => {
  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-4">Processing Time Trends (7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A4A4A" />
          <XAxis dataKey="time" stroke="#A8A8B8" />
          <YAxis dataKey="processingTime" stroke="#A8A8B8" unit="s" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a24', border: '1px solid #4A4A4A' }} cursor={{ strokeDasharray: '3 3' }} />
          <Legend wrapperStyle={{ color: '#A8A8B8' }} />
          <Scatter name="Processing Time" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProcessingTimeChart;
