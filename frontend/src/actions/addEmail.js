import {ADD_EMAIL_ACTIONS as Actions} from './actionTypes';

export const addEmailBegin = () => {
  return {
    type: Actions.POST,
  };
};

export const addEmailSuccess = () => {
  return {
    type: Actions.POST_SUCCESS,
  };
};

export const addEmailFailure = error => {
  return {
    type: Actions.POST_FAILURE,
    error: error
  };
};

export const addEmail = (email, options) => {
  return function(dispatch) {
    dispatch(addEmailBegin());
    fetch(`/api/addemail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, options: options })
    })
      .then(() => dispatch(addEmailSuccess()))
      .catch(error => dispatch(addEmailFailure(error)));
  };
};
