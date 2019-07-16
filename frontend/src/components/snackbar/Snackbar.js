import React from 'react';
import { Typography, SnackbarContent, IconButton } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

//const styles = makeStyles(theme => ({
//  backgroundColor: green[600],
//  icon: {
//    fontSize: 20
//  }
//}));

export default function customSnackbar(message) {
  //const classes = styles();
  console.log('snackbar');

  return (
    <SnackbarContent
      className={`snackbar-success ${green[600]}`}
      message={
        <Typography>
          <CheckCircleIcon className={{fontSize: 20}} />
          {message}
        </Typography>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit">
          <CloseIcon className={{fontSize: 20}} />
        </IconButton>
      ]}
    />
  );
}
