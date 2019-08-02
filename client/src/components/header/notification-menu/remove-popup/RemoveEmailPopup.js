import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import './RemoveEmailPopup.css';


class RemoveEmailPopup extends Component {
  state = {
    email: '',
  };

  handleClick = () => {
    this.props.removeEmail(this.state.email);
    this.props.close();
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  }

  render() {
    return (
      <Popup
        open={this.props.open}
        closeOnDocumentClick
        onClose={this.props.close}>
        <div className="remove-email-popup">
          <div className="popup-text">
            <Typography variant="body1">
              Enter your email address to stop recieving notifications.
            </Typography>
          </div>
          <div className="popup-right">
            <form className="form" noValidate autoComplete="off">
              <TextField
                id="standard-dense"
                className="textfield"
                label="email address"
                margin="dense"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Button
                onClick={this.handleClick}
                disabled={!(this.state.email.includes('@') && this.state.email.includes('.'))}>
                remove email
              </Button>
            </form>
          </div>
        </div>
      </Popup>
    );
  }
}

export default RemoveEmailPopup;
