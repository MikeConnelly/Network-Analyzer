import {SPEED_TEST_ACTIONS as Actions} from './actionTypes';

export const speedTestBegin = () => {
  return {
    type: Actions.GET,
    loading: true,
  };
};

export const speedTestSuccess = content => {
  return {
    type: Actions.GET_SUCCESS,
    loading: false,
    data: content
  };
};

export const speedTestFailure = error => {
  return {
    type: Actions.GET_FAILURE,
    loading: false,
    error: error
  };
};

export const speedtest = () => {
  return function(dispatch) {
    dispatch(speedTestSuccess());
    fetch(`/api/speedtest`)
      .then(res => res.json())
      .then(data => {
        dispatch(speedTestSuccess(data));
        return data;
      })
      .catch(error => dispatch(speedTestFailure(error)));
  }
}
