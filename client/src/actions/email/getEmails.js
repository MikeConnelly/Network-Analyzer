import {GET_EMAIL_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

export const getEmailsBegin = () => {
  return {
    type: Actions.GET,
    pending: true
  };
};

export const getEmailsSuccess = content => {
  return {
    type: Actions.GET_SUCCESS,
    pending: false,
    data: content
  };
};
  
export const getEmailsFailure = error => {
  return {
    type: Actions.GET_FAILURE,
    pending: false,
    error: error
  };
};

export const getEmails = () => {
  return function(dispatch) {
    dispatch(getEmailsBegin());
    fetch(`${proxy()}/api/email/all`)
      .then(res => res.json())
      .then(data => {
        dispatch(getEmailsSuccess(data));
        return data;
      })
      .catch(err => dispatch(getEmailsFailure(err)));
  }
}
