import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as getRecentActions from '../../actions/getRecent';
import Home from './Home';

export const HomeContainer = ({ actions, recent }) => {
  return (
    <Home actions={actions} data={recent.data} isFetching={recent.loading} />
  );
}

const mapStateToProps = state => {
  return {
    recent: state.getRecent
  };
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators({...getRecentActions}, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
