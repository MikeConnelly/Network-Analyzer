import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import './AddEmailPopup.css';


const styles = {
  menu: {
    width: 200
  }
}

class AddEmailPopup extends Component {
  state = {
    email: '',
    frequency: 'daily'
  };

  handleClick = () => {
    const options = {
      frequency: this.state.frequency
    }
    this.props.addEmail(this.state.email, options);
    this.props.close();
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  }

  handleSelect = event => {
    this.setState({ frequency: event.target.value });
  }

  render() {
    const { classes } = this.props;
    const frequencies = ['daily', 'weekly', 'monthly'];

    return (
      <Popup
        open={this.props.open}
        closeOnDocumentClick
        onClose={this.props.close}>
        <div className="add-email-popup">
          <div className="popup-text">
            <Typography variant="h6">
              Enter your email address and the frequency that you would like 
              to recieve notifications.
            </Typography>
          </div>
          <div className="popup-right">
            <form className="form" noValidate autoComplete="off">
              <TextField
                className="textfield"
                label="email address"
                onChange={this.handleChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="frequency-select"
                select
                label="frequency"
                className="textfield"
                onChange={this.handleSelect}
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
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
        </div>
      </Popup>
    );
  }
}

export default withStyles(styles)(AddEmailPopup);
