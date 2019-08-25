import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/results/changeResultType';
import PropTypes from 'prop-types';
import SpeedtestResults from './SpeedtestResults';

export const SpeedtestResultsContainer = ({ actions, advanced, ...props }) => {
  return (
    <SpeedtestResults 
      data={props.data} 
      isFetching={props.isFetching} 
      advanced={advanced} 
      handleChange={actions.changeResultType}
    />
  );
}

const mapStateToProps = state => {
  return {
    advanced: state.changeResultType.advanced
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

SpeedtestResultsContainer.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool
}

SpeedtestResultsContainer.defaultProps = {
  data: {},
  isFetching: false
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeedtestResultsContainer);
