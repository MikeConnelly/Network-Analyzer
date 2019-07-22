import React, {Component} from 'react';
import Graph from './Graph';
import DateFilter from './DateFilter';
import './GraphWrapper.css';

class GraphWrapper extends Component {

  graphClicked = event => {
    window.location = `/detail/${event.activePayload[0].payload.dateTime}`;
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
