import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import {
  Typography,
  TextField,
  Button,
  withStyles
} from '@material-ui/core';
import CustomSnackbar from '../../snackbar/Snackbar';
import './AddEmailPopup.css';

const styles = {
  menu: {
    width: 200
  }
}

class AddEmailPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      frequency: 'daily',
      snackbarOpen: false,
      snackbarStatus: false
    };
  }

  handleClick = () => {
    const options = {
      frequency: this.state.frequency
    }
    this.props.addEmail(this.state.email, options, err => {
      if (err) this.openSnackbar(false);
      else this.openSnackbar(true);
    });
    this.props.close();
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  }

  handleSelect = event => {
    this.setState({ frequency: event.target.value });
  }
  
  openSnackbar = status => {
    this.setState({ snackbarOpen: true, snackbarStatus: status });
  }

  closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false })
  }

  render() {
    const { classes } = this.props;
    const frequencies = ['daily', 'weekly', 'monthly'];

    return (
      <div>
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
              <form className="form" autoComplete="off" noValidate>
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
        <CustomSnackbar
          open={this.state.snackbarOpen}
          handleClose={this.closeSnackbar}
          status={this.state.snackbarStatus}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AddEmailPopup);
