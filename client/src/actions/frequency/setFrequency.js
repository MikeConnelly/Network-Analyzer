import {SET_FREQUENCY_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

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

export const setFrequency = (freq, cb) => {
  return function(dispatch) {
    dispatch(setFrequencyBegin());
    fetch(`${proxy()}/api/config/frequency`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ frequency: freq })
    })
      .then(() => {
        dispatch(setFrequencySuccess());
        if (cb) cb();
      })
      .catch(err => {
        dispatch(setFrequencyBegin(err));
        if (cb) cb(err);
      });
  };
};
