import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as getEmailActions from '../../actions/email/getEmails';
import * as addEmailActions from '../../actions/email/addEmail';
import * as removeEmailActions from '../../actions/email/removeEmail';
import * as getFrequencyActions from '../../actions/frequency/getFrequency';
import * as setFrequencyActions from '../../actions/frequency/setFrequency';
import Settings from './Settings';

export const SettingsContainer = ({ actions, getEmails, getFrequency }) => {
  return (
    <Settings 
      actions={actions}
      emails={getEmails.data}
      emailsAreFetching={getEmails.data}
      frequency={getFrequency.data}
      frequencyIsFetching={getFrequency.pending}
    />
  );
}

const mapStateToProps = state => {
  return {
    getEmails: state.getEmails,
    getFrequency: state.getFrequency
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      ...getEmailActions,
      ...addEmailActions, 
      ...removeEmailActions, 
      ...getFrequencyActions, 
      ...setFrequencyActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
