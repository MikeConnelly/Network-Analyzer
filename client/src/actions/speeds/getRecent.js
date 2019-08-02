import {GET_RECENT_ACTIONS as Actions} from '../actionTypes';
import proxy from '../proxy';

export const getRecentBegin = () => {
  return {
    type: Actions.GET,
    loading: true,
  };
};

export const getRecentSuccess = content => {
  return {
    type: Actions.GET_SUCCESS,
    loading: false,
    data: content
  };
};

export const getRecentFailure = error => {
  return {
    type: Actions.GET_FAILURE,
    loading: false,
    error: error
  };
};

export const getRecent = (from, to) => {
  return function(dispatch) {
    dispatch(getRecentBegin());
    fetch(`${proxy()}/api/speeds/many?from=${from}&to=${to}`)
      .then(res => res.json())
      .then(data => {
        dispatch(getRecentSuccess(data));
        return data;
      })
      .catch(error => dispatch(getRecentFailure(error)));
  }
}
