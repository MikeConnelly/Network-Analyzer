import {ADD_EMAIL_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

export const addEmailBegin = () => {
  return {
    type: Actions.PUT,
  };
};

export const addEmailSuccess = () => {
  return {
    type: Actions.PUT_SUCCESS,
  };
};

export const addEmailFailure = error => {
  return {
    type: Actions.PUT_FAILURE,
    error: error
  };
};

export const addEmail = (email, options) => {
  return function(dispatch) {
    dispatch(addEmailBegin());
    fetch(`${proxy()}/api/email`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, options: options })
    })
      .then(() => dispatch(addEmailSuccess()))
      .catch(error => dispatch(addEmailFailure(error)));
  };
};
