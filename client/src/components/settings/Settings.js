import React, { Component } from 'react'
import MailListContainer from './mail-list/MailListContainer';
import FrequencyFormContainer from './frequency-form/FrequencyFormContainer';
import MailerFormContainer from './mailer-form/MailerFormContainer';
import CustomSnackbar from '../snackbar/Snackbar';
import './Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbarOpen: false,
      snackbarStatus: false
    };
    this.openSnackbar = this.openSnackbar.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  openSnackbar(status) {
    this.setState({ snackbarOpen: true, snackbarStatus: status });
  }

  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false })
  }

  render() {
    return (
      <div className="settings">
        <MailListContainer openSnackbar={this.openSnackbar} />
        <FrequencyFormContainer />
        <MailerFormContainer />
        <CustomSnackbar
          open={this.state.snackbarOpen}
          handleClose={this.handleClose}
          status={this.state.snackbarStatus}
        />
      </div>
    );
  }
}

export default Settings;
