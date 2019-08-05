import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getEmailActions from '../../../actions/email/getEmails';
import * as removeEmailActions from '../../../actions/email/removeEmail';
import MailList from './MailList';

export const MailListContainer = ({ actions, getEmails, openSnackbar }) => {
  return (
    <MailList
      actions={actions}
      emails={getEmails.data}
      emailsAreFetching={getEmails.pending}
      openSnackbar={openSnackbar}
    />
  );
}

const mapStateToProps = state => {
  return {
    getEmails: state.getEmails
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...getEmailActions, ...removeEmailActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailListContainer);
