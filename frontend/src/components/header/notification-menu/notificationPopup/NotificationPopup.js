import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './NotificationPopup.css';
import { Typography } from '@material-ui/core';


const styles = {
  menu: {
    width: 200
  }
}

class NotificationPopup extends Component {
  state = {
    email: '',
    frequency: 'daily'
  };

  handleClick = () => {
    const options = {
      frequency: this.state.frequency
    };
    this.props.actions.addEmail(this.state.email, options);
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  }

  handleSelect = event => {
    this.setState({ frequency: event.target });
  }

  render() {
    const { classes } = this.props;
    const frequencies = ['daily', 'weekly', 'monthly'];

    return (
      <Popup 
        open={this.props.open}
        closeOnDocumentClick
        onClose={this.props.close}>
        <div className="notification-popup">
          <div className="popup-text">
            <Typography variant="body1">
              This text explains stuff.
            </Typography>
          </div>
          <form className="form" noValidate autoComplete="off">
            <TextField
              id="standard-dense"
              className="textfield"
              label="email address"
              margin="dense"
              onChange={this.handleChange}
            />
            <TextField
              id="frequency-select"
              select
              label="frequency"
              className="textfield"
              onChange={this.handleSelect}
              margin="normal"
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}>
              {frequencies.map(freq => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </TextField>
            <Button
              onClick={this.handleClick}
              disabled={!(this.state.email.includes('@') && this.state.email.includes('.'))}>
              add email
            </Button>
          </form>
        </div>
      </Popup>
    );
  }
}

export default withStyles(styles)(NotificationPopup);
