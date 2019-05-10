import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as getRecentActions from '../../actions/getRecent';
import * as speedTestActions from '../../actions/speedTest';
import Home from './Home';

export const HomeContainer = ({ actions, recent, speedtest }) => {
  return (
    <Home 
      actions={actions} 
      recentData={recent.data} 
      recentIsFetching={recent.loading} 
      speedtestData={speedtest.data}
      speedtestIsFetching={speedtest.loading}
    />
  );
}

const mapStateToProps = state => {
  return {
    recent: state.getRecent,
    speedtest: state.speedTest
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({...getRecentActions, ...speedTestActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
