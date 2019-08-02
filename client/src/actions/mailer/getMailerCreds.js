import {GET_MAILER_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

export const getMailerBegin = () => {
  return {
    type: Actions.GET,
    pending: true,
  };
};

export const getMailerSuccess = content => {
  return {
    type: Actions.GET_SUCCESS,
    pending: false,
    data: content
  };
};

export const getMailerFailure = error => {
  return {
    type: Actions.GET_FAILURE,
    pending: false,
    error: error
  };
};

export const getMailerCreds = () => {
  return function(dispatch) {
    dispatch(getMailerBegin());
    fetch(`${proxy()}/api/config/mailer`)
      .then(res => res.json())
      .then(data => {
        dispatch(getMailerSuccess(data));
        return data;
      })
      .catch(error => dispatch(getMailerFailure(error)));
  }
}
