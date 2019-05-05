export const GET_RECENT_BEGIN = 'GET_RECENT_BEGIN';
export const GET_RECENT_SUCCESS = 'GET_RECENT_SUCCESS';
export const GET_RECENT_FAILURE = 'GET_RECENT_FAILURE';

export const getRecentBegin = () => ({
  type: GET_RECENT_BEGIN
});

export const getRecentSuccess = data => ({
  type: GET_RECENT_SUCCESS,
  payload: {data}
});

export const getRecentFailure = error => ({
  type: GET_RECENT_FAILURE,
  payload: {error}
});
