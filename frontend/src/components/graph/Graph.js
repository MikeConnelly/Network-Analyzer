import React, {Component} from 'react';
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts';
import FilterButton from './filter-button/FilterButton';

// check out material-ui line chart
class Graph extends Component {
  render() {
    return (
      <div class="graph">
        <AreaChart 
          width={800}
          height={400}
          data={this.props.data}
          margin={{ top: 20, right: 30, left: 0, bottom: 0}}
        >
          <XAxis dataKey="dateObject.xaxis" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="speeds.download" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="speeds.upload" stroke="#00dd55" fill="#00dd55" />
        </AreaChart>
        <FilterButton actions={this.props.actions} />
      </div>
    )
  }
}

export default Graph;
