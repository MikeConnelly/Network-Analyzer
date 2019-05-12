import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles'
import './NotificationPopup.css';


const styles = {
  menu: {
    width: 200
  }
}

class NotificationPopup extends Component {
  state = {
    frequency: '',
  };

  handleChange = event => {
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
          <form className="form" noValidate autoComplete="off">
            <TextField
              id="standard-dense"
              className="textfield"
              label="email address"
              margin="dense"
            />
            <TextField
              id="frequency-select"
              select
              label="frequency"
              className="textfield"
              onChange={this.handleChange}
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
          </form>
        </div>
      </Popup>
    );
  }
}

export default withStyles(styles)(NotificationPopup);
