export const GET_SPEED_BEGIN = 'GET_SPEED_BEGIN';
export const GET_SPEED_SUCCESS = 'GET_SPEED_SUCCESS';
export const GET_SPEED_FAILURE = 'GET_SPEED_FAILURE';

export const getSpeedBegin = () => ({
  type: GET_SPEED_BEGIN
});

export const getSpeedSuccess = data => ({
  type: GET_SPEED_SUCCESS,
  payload: {data}
});

export const getSpeedFailure = error => ({
  type: GET_SPEED_FAILURE,
  payload: {error}
});
