import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as speedTestActions from '../../actions/speedtest/speedTest';
import Home from './Home';


export const HomeContainer = ({ actions, speedTest }) => {
  return (
    <Home 
      actions={actions}
      speedtestData={speedTest.data}
      speedtestIsFetching={speedTest.loading}
    />
  );
}

const mapStateToProps = state => {
  return {
    speedTest: state.speedTest
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...speedTestActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
