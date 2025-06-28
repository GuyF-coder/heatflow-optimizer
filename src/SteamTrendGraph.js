import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function SteamTrendGraph({ data }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="steam" stroke="#8884d8" name='קיטור (ק"ג/שעה)' />
          <Line type="monotone" dataKey="savings" stroke="#82ca9d" name='חיסכון (₪/שעה)' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SteamTrendGraph;
