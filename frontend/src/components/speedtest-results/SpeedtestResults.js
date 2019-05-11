import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';


class SpeedtestResults extends Component {
  render() {
    const { data, isFetching } = this.props;

    if (isFetching) {
      return <div className="results">testing...</div>
    } else {
      return <div className="results">{_get(data, 'speeds.download', '')}</div>;
    }
  }
}

SpeedtestResults.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool
}

SpeedtestResults.defaultProps = {
  data: {},
  isFetching: false
}

export default SpeedtestResults;
