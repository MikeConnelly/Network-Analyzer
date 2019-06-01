import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core'
import NotificationMenu from './notification-menu/NotificationMenu';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">
          <Button
            className="home-page-button"
            color="secondary">
            home  
          </Button>
        </Link>
        <Link to="/detail">
          <Button
            className="detail-page-button"
            color="secondary">
            Details
          </Button>
        </Link>
        <NotificationMenu actions={this.props.actions} />
      </div>
    );
  }
}

export default Header;
