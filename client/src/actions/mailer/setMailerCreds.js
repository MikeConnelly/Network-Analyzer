import {PUT_MAILER_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

export const setMailerBegin = () => {
  return {
    type: Actions.PUT,
  };
};

export const setMailerSuccess = () => {
  return {
    type: Actions.PUT_SUCCESS,
  };
};

export const setMailerFailure = error => {
  return {
    type: Actions.PUT_FAILURE,
    error: error
  };
};

export const setMailerCreds = (creds, cb) => {
  return function(dispatch) {
    dispatch(setMailerBegin());
    fetch(`${proxy()}/api/config/mailer`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: creds.address, pass: creds.password })
    })
      .then(() => {
        dispatch(setMailerSuccess());
        if (cb) cb();
      })
      .catch(err => {
        dispatch(setMailerBegin(err));
        if (cb) cb(err);
      });
  };
};
