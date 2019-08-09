import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getOneActions from '../../actions/speeds/getOne';
import Detail from './Detail';


export const DetailContainer = ({ actions, specified }) => {
  return (
    <Detail 
      actions={actions}
      detailData={specified.data}
    />
  );
}

const mapStateToProps = state => {
  return {
    specified: state.getOne
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...getOneActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer);
