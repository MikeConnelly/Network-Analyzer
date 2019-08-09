import {REMOVE_EMAIL_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

export const removeEmailBegin = () => {
  return {
    type: Actions.DELETE,
  };
};

export const removeEmailSuccess = () => {
  return {
    type: Actions.DELETE_SUCCESS,
  };
};

export const removeEmailFailure = error => {
  return {
    type: Actions.DELETE_FAILURE,
    error: error
  };
};

export const removeEmail = (email, cb) => {
  return function(dispatch) {
    dispatch(removeEmailBegin());
    fetch(`${proxy()}/api/email/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    })
      .then(() => {
        dispatch(removeEmailSuccess());
        if (cb) cb();
      })
      .catch(err => {
        dispatch(removeEmailFailure(err));
        if (cb) cb(err);
      });
  };
};
