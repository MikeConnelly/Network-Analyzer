import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import {
  Typography,
  Button,
  TextField
} from '@material-ui/core';

class MailerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailer: {
        address: '',
        password: ''
      }
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSetMailerCreds = this.handleSetMailerCreds.bind(this);
  }

  componentDidMount() {
    this.props.actions.getMailerCreds();
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(nextProps.mailer) && nextProps.mailer.user.length > 0 && nextProps.mailer.pass.length > 0 && nextProps.mailer !== this.props.mailer) {
      const newMailer = { address: nextProps.mailer.user, password: nextProps.mailer.pass };
      this.setState({ mailer: newMailer });
    }
  }

  handleAddressChange(event) {
    const value = event.target.value;
    const newMailer = {
      address: value,
      password: this.state.mailer.password
    };
    this.setState({ mailer: newMailer });
  }

  handlePasswordChange(event) {
    const value = event.target.value;
    const newMailer = {
      address: this.state.mailer.address,
      password: value
    };
    this.setState({ mailer: newMailer });
  }

  handleSetMailerCreds() {
    this.props.actions.setMailerCreds(this.state.mailer);
  }

  render() {
    return (
      <div className="settings-category">
        <Typography variant="h6">
          Set Mailer Credentials
        </Typography>
        <div id="mailer-creds-input">
          <TextField
            id="email-address-field"
            label="email address"
            value={this.state.mailer.address}
            InputLabelProps={{shrink: true}}
            onChange={this.handleAddressChange}
          />
          <TextField
            id="email-password-field"
            label="password"
            value={this.state.mailer.password}
            InputLabelProps={{shrink: true}}
            onChange={this.handlePasswordChange}
          />
          <Button 
            id="update-mailer-button"
            disabled={false}
            onClick={this.handleSetMailerCreds}
            variant="contained"
            color="secondary">
            update
          </Button>
          <Button
            id="remove-mailer-button"
            disabled={false}
            onClick={() => {}}
            variant="contained"
            color="secondary">
            remove
          </Button>
        </div>
      </div>
    );
  }
}

MailerForm.propTypes = {
  actions: PropTypes.shape({
    getMailerCreds: PropTypes.func.isRequired,
    setMailerCreds: PropTypes.func.isRequired
  }),
  mailer: PropTypes.shape({
    user: PropTypes.string,
    pass: PropTypes.string
  })
};

export default MailerForm;
