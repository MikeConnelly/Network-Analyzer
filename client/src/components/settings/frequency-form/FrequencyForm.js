import React, { Component } from 'react'
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import {
  Typography,
  TextField,
  Button,
  withStyles
} from '@material-ui/core';

const styles = {
  shortTextField: {
    width: 30,
    margin: 5
  }
};

class FrequencyForm extends Component {
  constructor(props) {
    super(props);
    this.defaultFrequency = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    this.state = {
      emails: [],
      frequency: this.defaultFrequency,
      validFrequency: false
    };
    this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
    this.validateFrequency = this.validateFrequency.bind(this);
    this.handleSetFrequency = this.handleSetFrequency.bind(this);
  }

  componentDidMount() {
    this.props.actions.getFrequency();
  }

  componentWillReceiveProps(nextProps) {
    if (!_isEmpty(nextProps.frequency) && nextProps.frequency !== this.props.frequency) {
      this.setState({ frequency: this.convertMilliSecondsToHMS(nextProps.frequency.frequency) });
    }
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

  handleSetFrequency() {
    this.setState({ validFrequency: false });
    this.props.actions.setFrequency(this.convertHMSToMilliSeconds(this.state.frequency), err => {
      if (err) {
        this.props.openSnackbar(false);
      } else {
        this.props.openSnackbar(true);
        this.props.actions.getFrequency();
      }
    });
  }

  render() {
    const { classes, frequency } = this.props;
    
    return (
      <div id="frequency-form">
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
          </div>
          <Button 
            id="validate-frequency-button"
            disabled={
              !this.state.validFrequency
              || this.convertHMSToMilliSeconds(this.state.frequency) === frequency.frequency
            }
            onClick={() => this.handleSetFrequency()}
            variant="contained"
            color="secondary">
            update
          </Button>
        </div>
      </div>
    );
  }
}

FrequencyForm.propTypes = {
  actions: PropTypes.shape({
    getFrequency: PropTypes.func.isRequired,
    setFrequency: PropTypes.func.isRequired
  }),
  frequency: PropTypes.object,
  frequencyIsFetching: PropTypes.bool
};

export default withStyles(styles)(FrequencyForm);
