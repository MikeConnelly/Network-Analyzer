import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ClickAwayListener,
  Button,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  Grow,
  Typography
} from '@material-ui/core';
import AddEmailPopup from './add-popup/AddEmailPopup';
import RemoveEmailPopup from './remove-popup/RemoveEmailPopup';


class NotificationMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      popup: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = type => {
    this.setState({ popup: type });
    this.handleClick();
  }

  closeModal = () => {
    this.setState({ popup: '' });
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
          id="notification-menu-button"
          className="header-button"
          aria-owns={open ? 'notification-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          buttonRef={node => {
            this.anchorEl = node;
          }}>
          <Typography variant="h6" color="secondary">
            Notifications
          </Typography>
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem 
                      className="add-email"
                      onClick={event => this.openModal('add')}>
                      add email
                    </MenuItem>
                    <MenuItem 
                      className="remove-email"
                      onClick={event => this.openModal('remove')}>
                      remove email
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <div className="popup">
            {(() => {
              switch (popup) {
                case 'add':
                  return <AddEmailPopup open={true} close={this.closeModal} addEmail={this.props.actions.addEmail} />;
                case 'remove':
                  return <RemoveEmailPopup open={true} close={this.closeModal} removeEmail={this.props.actions.removeEmail} />;
                default:
                  return;
              }
            })()}
        </div>
      </div>
    );
  }
}

NotificationMenu.propTypes = {
  actions: PropTypes.shape({
    addEmail: PropTypes.func.isRequired,
    removeEmail: PropTypes.func.isRequired
  })
}

NotificationMenu.defaultProps = {
  actions: {
    addEmail: () => {},
    removeEmail: () => {}
  }
}

export default NotificationMenu;
