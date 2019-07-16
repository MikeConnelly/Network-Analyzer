import {ADD_EMAIL_ACTIONS as Actions} from '../../actions/actionTypes';

const initialState = {
  error: null
};

export default function addEmailReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.PUT_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

export const addEmailError = state => state.error;
