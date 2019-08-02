import React, {Component} from 'react';
import Graph from './Graph';
import DateFilter from './DateFilter';
import './GraphWrapper.css';

class GraphWrapper extends Component {

  graphClicked = event => {
    if (event) {
      const speedtestDateTime = event.activePayload[0].payload.dateTime;
      if (!window.location.pathname.includes('detail')) {
        window.location = `/detail/${speedtestDateTime}`;
      } else {
        window.history.replaceState({}, '', `/detail/${speedtestDateTime}`);
        this.props.actions.getOne(speedtestDateTime);
      }
    }
  }

  render() {
    return (
      <div className="graph-wrapper">
        <Graph actions={this.props.actions} data={this.props.data} openDetail={this.graphClicked} />
        <DateFilter actions={this.props.actions} />
      </div>
    );
  }
}

export default GraphWrapper;
