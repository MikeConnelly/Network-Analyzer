import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getRecentActions from '../../actions/speeds/getRecent';
import * as getOneActions from '../../actions/speeds/getOne';
import Detail from './Detail';


export const DetailContainer = ({ actions, recent, specified }) => {
  return (
    <Detail 
      actions={actions}
      recentData={recent.data}
      recentIsFetching={recent.loading}
      detailData={specified.data}
    />
  );
}

const mapStateToProps = state => {
  return {
    recent: state.getRecent,
    specified: state.getOne
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...getRecentActions, ...getOneActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
