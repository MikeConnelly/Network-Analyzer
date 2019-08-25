import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import GraphContainer from '../graph/GraphContainer';
import SpeedtestResultsContainer from '../speedtest-results/SpeedtestResultsContainer';
import './Detail.css';
    
class Detail extends Component {

  componentDidMount() {
    if (_isEmpty(this.props.detailData)) {
      const url = window.location.pathname;
      const speedtestDateTime = url.substring(url.lastIndexOf('/') + 1);
      if (speedtestDateTime !== 'detail') {
        this.props.actions.getOne(speedtestDateTime);
      }
    }
  }

  render() {
    const { detailData } = this.props;

    return (
      <div className="detail">
        <div className="detail-left">
          <GraphContainer />
        </div>
        <div className="detail-right">
          {!_isEmpty(detailData) && <SpeedtestResultsContainer data={detailData} isFetching={false} />}
        </div>
      </div>
    );
  }
}

Detail.propTypes = {
  actions: PropTypes.shape({
    getOne: PropTypes.func.isRequired
  }),
  detailData: PropTypes.object
};

Detail.defaultProps = {
  actions: {
    getOne: () => {}
  },
  detailData: {}
};

export default Detail;
