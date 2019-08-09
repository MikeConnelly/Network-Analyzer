import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Snackbar, SnackbarContent, withStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { red, green } from '@material-ui/core/colors';

const styles = {
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    fontSize: 20,
    opacity: 0.9
  },
  successVariant: {
    backgroundColor: green[600]
  },
  errorVariant: {
    backgroundColor: red[500]
  }
};

class CustomSnackbar extends Component {
  render() {
    const { classes, open, handleClose, status } = this.props;
    const message = status ? 'success' : 'error';
    const Icon = status ? CheckCircleIcon : ErrorIcon;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <SnackbarContent
          className={classes[status ? 'successVariant' : 'errorVariant']}
          message={
            <span id="snackbar-message" className={classes.message}>
              <Icon />
              {message}
            </span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
    );
  }
}

Snackbar.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  status: PropTypes.bool.isRequired
};

Snackbar.defaultProps = {
  open: false,
  status: false
};

export default withStyles(styles)(CustomSnackbar);
