import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getMailerActions from '../../../actions/mailer/getMailerCreds';
import * as setMailerActions from '../../../actions/mailer/setMailerCreds';
import MailerForm from './MailerForm';

export const MailerFormContainer = ({ actions, getMailerCreds }) => {
  return (
    <MailerForm
      actions={actions}
      mailer={getMailerCreds.data}
      mailerIsFetching={getMailerCreds.pending}
    />
  );
}

const mapStateToProps = state => {
  return {
    getMailerCreds: state.getMailerCreds
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...getMailerActions, ...setMailerActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailerFormContainer);
