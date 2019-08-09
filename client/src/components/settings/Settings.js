import React, { Component } from 'react'
import { Typography, Button } from '@material-ui/core';
import MailListContainer from './mail-list/MailListContainer';
import FrequencyFormContainer from './frequency-form/FrequencyFormContainer';
import MailerFormContainer from './mailer-form/MailerFormContainer';
import CustomSnackbar from '../snackbar/Snackbar';
// import proxy from '../../actions/proxy';
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

  handleDownload() {
    // fetch(`${proxy()}/api/download/`, {
    //   headers: {'Content-Type': 'application/json'}
    // });
    return;
  }

  render() {
    return (
      <div className="settings">
        <MailListContainer openSnackbar={this.openSnackbar} />
        <FrequencyFormContainer openSnackbar={this.openSnackbar} />
        <MailerFormContainer openSnackbar={this.openSnackbar} />
        <Typography variant="h6">
          Download Data
        </Typography>
        <Button
          id="download-button"
          onClick={this.handleDownload}
          variant="contained"
          color="secondary">
          Download
        </Button>
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
