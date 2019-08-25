import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  Area
} from 'recharts';

const Graph = ({ ...props }) => {
  const { recentData, recentIsFetching, openDetail } = props;
  
  if (recentIsFetching) {
    return (
      <div id="data-fetching" className="graph-wrapper">
        <CircularProgress variant="indeterminate" size={450} />
      </div>
    );
  }

  recentData.forEach(result => {
    const date = new Date(result.dateTime);
    result.dateObject = date;
    result.dateObject.xaxis = date.getDate();
  });

  return (
    <div className="graph">
      <AreaChart 
        onClick={openDetail}
        width={800}
        height={450}
        data={recentData}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}>
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

Graph.propTypes = {
  openDetail: PropTypes.func,
  recentData: PropTypes.array,
  recentIsFetching: PropTypes.bool
}

export default Graph;
