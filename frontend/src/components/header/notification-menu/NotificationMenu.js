import React, { Component } from 'react';
import { ClickAwayListener } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import NotificationPopup from './notificationPopup/NotificationPopup';


class NotificationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      popup: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({ popup: true });
    this.handleClick();
  }

  closeModal = () => {
    this.setState({ popup: false });
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  }

  render() {
    const { open, popup } = this.state;

    return (
      <div className="notification-menu">
        <Button
          aria-owns={open ? 'notification-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          buttonRef={node => {
            this.anchorEl = node;
          }}>
          Notifications
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem 
                      className="add-email"
                      onClick={this.openModal}>
                      add email
                    </MenuItem>
                    <MenuItem 
                      className="remove-email"
                      onClick={this.openModal}>
                      remove email
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <NotificationPopup open={popup} close={this.closeModal} />
      </div>
    );
  }
}

export default NotificationMenu;
