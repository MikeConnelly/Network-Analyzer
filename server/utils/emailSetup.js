import React, {Component} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Area} from 'recharts';

function getEpochTimeframe(timeframe) {
  const now = new Date();
  switch (timeframe) {
    case 'daily':
      return now.setDate(now.getDate() - 1);
    case 'weekly':
      return now.setDate(now.getDate() - 7);
    case 'monthly':
      return now.setDate(now.getDate() - 31);
    default:
      console.log(`Error: timeframe ${timeframe} is not daily|weekly|monthly`);
  }
}

async function generateEmail(db, timeframe) {
  const from = getEpochTimeframe(timeframe);
  const to = Date.now();
  const query = {
    dateTime: {
      $gte: parseFloat(from),
      $lte: parseFloat(to)
    }
  };
  const data = await db.collection('speeds').find(query).toArray();
  return renderToStaticMarkup(
    <div className="email-graph">
      <AreaChart 
        width={800}
        height={450}
        data={data}>
        <XAxis dataKey="dateObject.xaxis" minTickGap={20}>
          <Label value="day of the month" offset={0} position="bottom" />
        </XAxis>
        <YAxis label={{ value: 'Mbps', angle: -90, position: 'insideLeft' }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Area name="download" type="monotone" dataKey="speeds.download" stroke="#8884d8" fill="#8884d8" />
        <Area name="upload" type="monotone" dataKey="speeds.upload" stroke="#00dd55" fill="#00dd55" />
      </AreaChart>
    </div>
  );
}

export default generateEmail;
