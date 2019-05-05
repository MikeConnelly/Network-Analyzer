//import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import fetchRecentAction from '../../redux/fetchRecent';
import {getRecent, getRecentLoading, getRecentError} from '../../redux/reducers/getRecent';
import Home from './Home';


const mapStateToProps = state => ({
  data: getRecent(state),
  loading: getRecentLoading(state),
  error: getRecentError(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRecent: () => dispatch(fetchRecentAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
