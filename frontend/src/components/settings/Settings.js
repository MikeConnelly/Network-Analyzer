import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

class Settings extends Component {

  componentDidMount() {
    this.props.action.getEmails();
    this.props.actions.getFrequency();
  }

  render() {
    return this.props.frequency.frequency || <>idk</>;
  }
}

Settings.propTypes = {
  actions: PropTypes.shape({
    getFrequency: PropTypes.func.isRequired,
    setFrequency: PropTypes.func.isRequired
  }),
  frequency: PropTypes.object
};

Settings.defaultProps = {
  actions: {
    getFrequency: () => {},
    setFrequency: () => {}
  },
  frequency: {frequency: 0}
};

export default Settings;
