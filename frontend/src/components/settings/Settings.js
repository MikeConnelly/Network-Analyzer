import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import {
  withStyles,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
//import customSnackbar from '../snackbar/Snackbar';
import './Settings.css';

const styles = {
  shortTextField: {
    width: 30,
    margin: 5
  }
};

class Settings extends Component {
  constructor(props) {
    super(props);

    this.defaultFrequency = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.validateFrequency = this.validateFrequency.bind(this);
    this.handleSetFrequency = this.handleSetFrequency.bind(this);
    this.state = {
      emails: [],
      frequency: this.defaultFrequency,
      validFrequency: false,
      mailer: {
        address: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    this.props.actions.getEmails();
    this.props.actions.getFrequency();
    this.props.actions.getMailerCreds();
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(nextProps.frequency) && nextProps.frequency !== this.props.frequency) {
      this.setState({ frequency: this.convertMilliSecondsToHMS(nextProps.frequency.frequency) });
    }
    if (!_isEmpty(nextProps.emails) && nextProps.emails !== this.props.emails) {
      this.setState({ emails: nextProps.emails });
    }
  }

  async handleRemoveEmail(address) {
    await this.props.actions.removeEmail(address);
    const newEmails = this.state.emails.filter(email => email.address !== address);
    this.setState({ emails: newEmails });
  }

  handleSetFrequency() {
    this.setState({ validFrequency: false });
    this.props.actions.setFrequency(this.convertHMSToMilliSeconds(this.state.frequency));
    //customSnackbar();
    this.props.actions.getFrequency();
  }

  generateEmailListItems() {
    return this.state.emails.map(email => (
      <ListItem key={email.address}>
        <ListItemText className="item-text" primary={email.address} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="Delete" onClick={() => this.handleRemoveEmail(email.address)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
  }

  convertMilliSecondsToHMS(ms) {
    const frequency = this.defaultFrequency;
    let secs = ms / 1000;
    if (secs >= 3600 && Math.floor(secs/3600) > 0) {
      frequency.hours = Math.floor(secs/3600);
      secs = secs % 3600;
    }
    if (secs >= 60 && Math.floor(secs/60) > 0) {
      frequency.minutes = Math.floor(secs/60);
      secs = secs % 60;
    }
    frequency.seconds = secs;
    return frequency;
  }

  convertHMSToMilliSeconds(frequency) {
    let secs = 0;
    secs += frequency.hours * 3600;
    secs += frequency.minutes * 60;
    secs += frequency.seconds;
    secs *= 1000;
    return secs;
  }

  handleFrequencyChange(event, field) {
    const newFrequency = this.state.frequency;
    const value = event.target.value === '' ? 0 : parseInt(event.target.value, 10);
    switch (field) {
      case 'h':
        newFrequency.hours = value;
        break;
      case 'm':
        newFrequency.minutes = value;
        break;
      default:
        newFrequency.seconds = value;
        break;
    }
    this.setState({ frequency: newFrequency });
    this.validateFrequency();
  }

  validateFrequency() {
    const { hours, minutes, seconds } = this.state.frequency;
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      this.setState({ validFrequency: false });
      return;
    }
    if (this.convertHMSToMilliSeconds(this.state.frequency) < 60000) {
      this.setState({ validFrequency: false });
      return;
    }
    this.setState({ validFrequency: true });
  }

  handleSetMailerCreds() {

  }

  render() {
    const { classes } = this.props;

    return (
      <div className="settings">
        <div className="settings-category">
          <Typography variant="h6">
            Update Mail List
          </Typography>
          <div id="maillist">
            <List dense={true}>
              {this.generateEmailListItems()}
            </List>
          </div>
        </div>
        <div className="settings-category">
          <Typography variant="h6">
            Set Speedtest frequency
          </Typography>
          <div id="frequency-input">
            <TextField
              id="hour-field"
              className={classes.shortTextField}
              label="hh"
              value={this.state.frequency.hours}
              InputLabelProps={{shrink: true}}
              inputProps={{maxLength: 2}}
              onChange={(e) => this.handleFrequencyChange(e, 'h')}
            />
            <TextField 
              id="minute-field"
              className={classes.shortTextField}
              label="mm"
              value={this.state.frequency.minutes}
              InputLabelProps={{shrink: true}}
              inputProps={{maxLength: 2}}
              onChange={(e) => this.handleFrequencyChange(e, 'm')}
            />
            <TextField 
              id="second-field"
              className={classes.shortTextField}
              label="ss"
              value={this.state.frequency.seconds}
              InputLabelProps={{shrink: true}}
              inputProps={{maxLength: 2}}
              onChange={(e) => this.handleFrequencyChange(e, 's')}
            />
            <Button 
              id="validate-frequency-button"
              disabled={!this.state.validFrequency || this.convertHMSToMilliSeconds(this.state.frequency) === this.props.frequency.frequency}
              onClick={() => this.handleSetFrequency()}>
              update
            </Button>
          </div>
        </div>
        <div className="settings-category">
          <Typography variant="h6">
            Set Mailer Credentials
          </Typography>
          <div id="mailer-creds-input">
            <TextField
              id="email-address-field"
              label="email address"
              value={this.props.mailer.user}
            />
            <TextField
              id="email-password-field"
              label="password"
              value={this.props.mailer.pass}
            />
            <Button 
              id="update-mailer-button"
              disabled={() => {}}
              onClick={this.handleSetMailerCreds}>
              update
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  actions: PropTypes.shape({
    getEmails: PropTypes.func.isRequired,
    addEmail: PropTypes.func.isRequired,
    removeEmail: PropTypes.func.isRequired,
    getFrequency: PropTypes.func.isRequired,
    setFrequency: PropTypes.func.isRequired
  }),
  emails: PropTypes.array,
  frequency: PropTypes.object
};

Settings.defaultProps = {
  actions: {
    getEmails: () => [],
    addEmail: () => {},
    removeEmail: () => {},
    getFrequency: () => {},
    setFrequency: () => {}
  },
  emails: [],
  frequency: {}
};

export default withStyles(styles)(Settings);
