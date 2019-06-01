import {REMOVE_EMAIL_ACTIONS as Actions} from '../actions/actionTypes';

const initialState = {
  error: null
};

export default function removeEmailReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.DELETE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

export const removeEmailError = state => state.error;
