import React, { Component } from 'react';
import { AppBar, Button, Typography, withStyles } from '@material-ui/core'
import classNames from 'classnames';
import AddEmailPopup from './add-popup/AddEmailPopup';
import './Header.css';

const styles = {
  detailTitle: {
    textDecoration: 'underline'
  }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: false
    };
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  openPopup() {
    this.setState({ popup: true });
  }

  closePopup() {
    this.setState({ popup: false });
  }

  render() {
    const { classes } = this.props;
    let homeUnderlined = false;
    let detailUnderlined = false;
    let settingsUnderlined = false;
    
    if (window.location.href.indexOf('detail') > -1) {
      detailUnderlined = true;
    } else if (window.location.href.indexOf('settings') > -1) {
      settingsUnderlined = true;
    } else {
      homeUnderlined = true;
    }

    return (
      <div className="header">
        <AppBar id="appbar" position="static">
          <Button
            id="home-page-button"
            className="header-button"
            onClick={() => window.location = '/'}>
            <Typography
              className={classNames(homeUnderlined && classes.detailTitle)}
              variant="h6"
              color="secondary">
              Home
            </Typography>
          </Button>
          <Button
            id="detail-page-button"
            className="header-button"
            onClick={() => window.location = '/detail'}>
            <Typography
              className={classNames(detailUnderlined && classes.detailTitle)}
              variant="h6"
              color="secondary">
              Details
            </Typography>
          </Button>
          <Button
            id="settings-page-button"
            className="header-button"
            onClick={() => window.location = '/settings'}>
            <Typography 
              className={classNames(settingsUnderlined && classes.detailTitle)} 
              variant="h6"
              color="secondary">
              Settings
            </Typography>
          </Button>
          <Button
            id="notification-button"
            className="header-button"
            onClick={this.openPopup}>
            <i className="material-icons">notifications</i>
          </Button>
          <AddEmailPopup open={this.state.popup} close={this.closePopup} addEmail={this.props.actions.addEmail} />
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
