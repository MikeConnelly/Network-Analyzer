import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addEmailActions from '../../actions/email/addEmail';
import * as removeEmailActions from '../../actions/email/removeEmail';
import Header from './Header';


export const HeaderContainer = ({ actions, addEmail, removeEmail }) => {
  return (
    <Header 
      actions={actions} 
      addError={addEmail.error}
      removeError={removeEmail.error}
    />
  );
}

const mapStateToProps = state => {
  return {
    addEmail: state.addEmail,
    removeEmail: state.removeEmail
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({...addEmailActions, ...removeEmailActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
