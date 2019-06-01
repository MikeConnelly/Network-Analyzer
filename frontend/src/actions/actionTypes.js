export const GET_RECENT_ACTIONS = {
  GET: 'DATA:GET',
  GET_SUCCESS: 'DATA:GET:SUCCESS',
  GET_FAILURE: 'DATA:GET:FAILURE'
};

export const SPEED_TEST_ACTIONS = {
  GET: 'SPEED:GET',
  GET_SUCCESS: 'SPEED:GET:SUCCESS',
  GET_FAILURE: 'SPEED:GET:FAILURE'
};

export const ADD_EMAIL_ACTIONS = {
  POST: 'EMAIL:POST',
  POST_SUCCESS: 'EMAIL:POST:SUCCESS',
  POST_FAILURE: 'EMAIL:POST:FAILURE'
};

export const REMOVE_EMAIL_ACTIONS = {
  DELETE: 'EMAIL:DELETE',
  DELETE_SUCCESS: 'EMAIL:DELETE:SUCCESS',
  DELETE_FAILURE: 'EMAIL:DELETE:FAILURE'
};

export default { GET_RECENT_ACTIONS, SPEED_TEST_ACTIONS, ADD_EMAIL_ACTIONS, REMOVE_EMAIL_ACTIONS };
