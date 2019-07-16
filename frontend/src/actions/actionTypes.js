export const SPEED_TEST_ACTIONS = {
  GET: 'SPEED:GET',
  GET_SUCCESS: 'SPEED:GET:SUCCESS',
  GET_FAILURE: 'SPEED:GET:FAILURE'
};

export const GET_RECENT_ACTIONS = {
  GET: 'RECENT:GET',
  GET_SUCCESS: 'RECENT:GET:SUCCESS',
  GET_FAILURE: 'RECENT:GET:FAILURE'
};

export const GET_ONE_ACTIONS = {
  GET: 'ONE:GET',
  GET_SUCCESS: 'ONE:GET:SUCCESS',
  GET_FAILURE: 'ONE:GET:FAILURE'
};

export const GET_EMAIL_ACTIONS = {
  GET: 'EMAILS:GET',
  GET_SUCCESS: 'EMAILS:GET:SUCCESS',
  GET_FAILURE: 'EMAILS:GET:FAILURE'
};

export const ADD_EMAIL_ACTIONS = {
  PUT: 'EMAIL:PUT',
  PUT_SUCCESS: 'EMAIL:PUT:SUCCESS',
  PUT_FAILURE: 'EMAIL:PUT:FAILURE'
};

export const REMOVE_EMAIL_ACTIONS = {
  DELETE: 'EMAIL:DELETE',
  DELETE_SUCCESS: 'EMAIL:DELETE:SUCCESS',
  DELETE_FAILURE: 'EMAIL:DELETE:FAILURE'
};

export const GET_FREQUENCY_ACTIONS = {
  GET: 'FREQUENCY:GET',
  GET_SUCCESS: 'FREQUENCY:GET:SUCCESS',
  GET_FAILURE: 'FREQUENCY:GET:FAILURE'
};

export const SET_FREQUENCY_ACTIONS = {
  PUT: 'FREQUENCY:PUT',
  PUT_SUCCESS: 'FREQUENCY:PUT:SUCCESS',
  PUT_FAILURE: 'FREQUENCY:PUT:FAILURE'
};

export default { SPEED_TEST_ACTIONS, GET_RECENT_ACTIONS, GET_ONE_ACTIONS, GET_EMAIL_ACTIONS, ADD_EMAIL_ACTIONS, REMOVE_EMAIL_ACTIONS, GET_FREQUENCY_ACTIONS, SET_FREQUENCY_ACTIONS };
