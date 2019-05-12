import React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as addEmailActions from '../../actions/addEmail';
import Header from './Header';


export const HeaderContainer = ({ actions, addEmail }) => {
  return (
    <Header 
      actions={actions}
      addEmailError={addEmail.error} />
  );
}

const mapStateToProps = state => {
  return {
    addEmail: state.addEmail
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({...addEmailActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
