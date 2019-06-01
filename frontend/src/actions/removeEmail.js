import {REMOVE_EMAIL_ACTIONS as Actions} from './actionTypes';

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

export const removeEmail = email => {
  return function(dispatch) {
    dispatch(removeEmailBegin());
    fetch(`/api/removeemail`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
    })
      .then(() => dispatch(removeEmailSuccess()))
      .catch(error => dispatch(removeEmailFailure(error)));
  };
};
