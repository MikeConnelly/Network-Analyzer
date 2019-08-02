import {GET_FREQUENCY_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

export const getFrequencyBegin = () => {
  return {
    type: Actions.GET,
    pending: true
  };
};

export const getFrequencySuccess = content => {
  return {
    type: Actions.GET_SUCCESS,
    pending: false,
    data: content
  };
};
  
export const getFrequencyFailure = error => {
  return {
    type: Actions.GET_FAILURE,
    pending: false,
    error: error
  };
};

export const getFrequency = () => {
  return function(dispatch) {
    dispatch(getFrequencyBegin());
    fetch(`${proxy()}/api/config/frequency`, {
      method: 'GET',
      header: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        dispatch(getFrequencySuccess(data));
        return data;
      })
      .catch(error => dispatch(getFrequencyFailure(error)));
  }
}
