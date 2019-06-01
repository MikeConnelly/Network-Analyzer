import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getRecentActions from '../../actions/getRecent';
import Detail from './Detail';


export const DetailContainer = ({ detailData, actions, recent }) => {
  return (
    <Detail 
      detailData={detailData}
      actions={actions}
      recentData={recent.data} 
      recentIsFetching={recent.loading} 
    />
  );
}

const mapStateToProps = state => {
  return {
    recent: state.getRecent
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...getRecentActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
