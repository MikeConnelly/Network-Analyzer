import {GET_RECENT_ACTIONS as Actions} from './actionTypes';

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

export const getRecent = () => {
  return function(dispatch) {
    dispatch(getRecentBegin());
    fetch(`/api/getspeeds?from=${1557091298970}&to=${1557092678443}`)
      .then(res => res.json())
      .then(data => {
        dispatch(getRecentSuccess(data));
        return data;
      })
      .catch(error => dispatch(getRecentFailure(error)));
  }
}
