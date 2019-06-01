import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from '../graph/Graph';
import SpeedtestResults from '../speedtest-results/SpeedtestResults';
import './Detail.css';


class Detail extends Component {

  componentDidMount() {
    const currentDateTime = Date.now();
    const now = new Date();
    const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
    this.props.actions.getRecent(twentyFourHourAgoTime, currentDateTime);
  }

  render() {
    const { recentData, recentIsFetching } = this.props;

    recentData.forEach(result => {
      const date = new Date(result.dateTime);
      result.dateObject = date;
      result.dateObject.xaxis = date.getDate();
    });

    return (
      <div className="detail">
        <div className="detail-left">
          <Graph actions={this.props.actions} data={this.props.recentData} />
        </div>
        <div className="detail-right">
          <SpeedtestResults data={this.props.detailData} />
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  actions: PropTypes.shape({
    getRecent: PropTypes.func.isRequired
  }),
  detailData: PropTypes.object,
  recentData: PropTypes.object,
  recentIsFetching: PropTypes.bool
}

Detail.defaultProps = {
  actions: {
    getRecent: () => {}
  },
  detailData: {},
  recentData: [],
  recentIsFetching: false
}

export default Detail;
