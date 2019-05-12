import React, { Component } from 'react';
import NotificationMenu from './notification-menu/NotificationMenu';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <NotificationMenu actions={this.props.actions} />
      </div>
    );
  }
}

export default Header;
