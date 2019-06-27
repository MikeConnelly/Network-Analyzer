import {SET_FREQUENCY_ACTIONS as Actions} from '../actionTypes';

export const setFrequencyBegin = () => {
  return {
    type: Actions.PUT,
  };
};

export const setFrequencySuccess = () => {
  return {
    type: Actions.PUT_SUCCESS,
  };
};

export const setFrequencyFailure = error => {
  return {
    type: Actions.PUT_FAILURE,
    error: error
  };
};

export const setFrequency = freq => {
  return function(dispatch) {
    dispatch(setFrequencyBegin());
    fetch(`/api/config/frequency`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frequency: freq })
    })
      .then(() => dispatch(setFrequencySuccess()))
      .catch(error => dispatch(setFrequencyBegin(error)));
  };
};
