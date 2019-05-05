import React, {Component} from 'react';
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts';

class Graph extends Component {
  render() {
    return (
      <AreaChart 
        width={400}
        height={400}
        data={this.props.data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0}}
      >
        <XAxis dataKey="dateTime" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="speeds.download" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    )
  }
}

export default Graph;
