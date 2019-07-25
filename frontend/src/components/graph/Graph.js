import React, {Component} from 'react';
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, Area} from 'recharts';


class Graph extends Component {
  render() {
    return (
      <div className="graph">
        <AreaChart 
          onClick={this.props.openDetail}
          width={800}
          height={450}
          data={this.props.data}
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
}

export default Graph;
