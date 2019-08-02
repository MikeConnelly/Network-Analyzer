import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getRecentActions from '../../actions/speeds/getRecent';
import * as getOneActions from '../../actions/speeds/getOne';
import * as speedTestActions from '../../actions/speedtest/speedTest';
import Home from './Home';


export const HomeContainer = ({ actions, recent, speedTest }) => {
  return (
    <Home 
      actions={actions} 
      recentData={recent.data} 
      recentIsFetching={recent.loading} 
      speedtestData={speedTest.data}
      speedtestIsFetching={speedTest.loading}
    />
  );
}

const mapStateToProps = state => {
  return {
    recent: state.getRecent,
    speedTest: state.speedTest
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...getRecentActions, ...speedTestActions, ...getOneActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
