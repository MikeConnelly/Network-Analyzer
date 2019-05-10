import React, { Component } from 'react';


class SpeedtestResults extends Component {
  render() {
    const { data } = this.props;
    console.log(data);
    return <div>{data.toString()}</div>;
  }
}

export default SpeedtestResults;
