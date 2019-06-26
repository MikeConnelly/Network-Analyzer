import React, { Component } from 'react';
import { Button, Typography } from '@material-ui/core'
import NotificationMenu from './notification-menu/NotificationMenu';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Button id="home-page-button" className="header-button" onClick={() => window.location = '/'}>
          <Typography color="secondary">Home</Typography>
        </Button>
        <Button id="detail-page-button" className="header-button" onClick={() => window.location = '/detail'}>
          <Typography color="secondary">Details</Typography>
        </Button>
        <NotificationMenu actions={this.props.actions} />
        <Button id="settings-page-button" className="header-button" onClick={() => window.location = '/settings'}>
          <Typography color="secondary">Settings</Typography>
        </Button>
      </div>
    );
  }
}

export default Header;
