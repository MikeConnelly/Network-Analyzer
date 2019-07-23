import React, { Component } from 'react';
import { AppBar, Button, Typography, withStyles } from '@material-ui/core'
import NotificationMenu from './notification-menu/NotificationMenu';
import './Header.css';

const styles = {
  detailTitle: {
    textDecoration: 'underline'
  }
};

class Header extends Component {
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
          <Button id="home-page-button" className="header-button" onClick={() => window.location = '/'}>
            <Typography className={homeUnderlined && classes.detailTitle} variant="h6" color="secondary">Home</Typography>
          </Button>
          <Button id="detail-page-button" className="header-button" onClick={() => window.location = '/detail'}>
            <Typography className={detailUnderlined && classes.detailTitle} variant="h6" color="secondary">Details</Typography>
          </Button>
          <NotificationMenu actions={this.props.actions} />
          <Button id="settings-page-button" className="header-button" onClick={() => window.location = '/settings'}>
            <Typography className={settingsUnderlined && classes.detailTitle} variant="h6" color="secondary">Settings</Typography>
          </Button>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
