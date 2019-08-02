import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import GraphWrapper from '../graph/GraphWrapper';
import SpeedtestResultsWrapper from '../speedtest-results/SpeedtestResultsWrapper';
import './Detail.css';
    
class Detail extends Component {

  componentDidMount() {
    if (_isEmpty(this.props.recentData)) {
      const currentDateTime = Date.now();
      const now = new Date();
      const twentyFourHourAgoTime = now.setDate(now.getDate() - 1);
      this.props.actions.getRecent(twentyFourHourAgoTime, currentDateTime);
    }
    if (_isEmpty(this.props.detailData)) {
      const url = window.location.pathname;
      const speedtestDateTime = url.substring(url.lastIndexOf('/') + 1);
      if (speedtestDateTime !== 'detail') {
        this.props.actions.getOne(speedtestDateTime);
      }
    }
  }

  render() {
    const { recentData, recentIsFetching, detailData } = this.props;
    
    if (recentIsFetching) {
      return <div className="detail"></div>;
    }

    recentData.forEach(result => {
      const date = new Date(result.dateTime);
      result.dateObject = date;
      result.dateObject.xaxis = date.getDate();
    });

    return (
      <div className="detail">
        <div className="detail-left">
          <GraphWrapper actions={this.props.actions} data={this.props.recentData} openDetail={this.graphClicked} />
        </div>
        <div className="detail-right">
          {!_isEmpty(detailData) && <SpeedtestResultsWrapper data={detailData} isFetching={false} />}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  actions: PropTypes.shape({
    getRecent: PropTypes.func.isRequired,
    getOne: PropTypes.func.isRequired
  }),
  recentData: PropTypes.array,
  recentIsFetching: PropTypes.bool,
  detailData: PropTypes.object
};

Detail.defaultProps = {
  actions: {
    getRecent: () => {},
    getOne: () => {}
  },
  recentData: [],
  recentIsFetching: false,
  detailData: {}
};

export default Detail;
