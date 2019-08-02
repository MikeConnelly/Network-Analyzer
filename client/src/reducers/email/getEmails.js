import {GET_EMAIL_ACTIONS as Actions} from '../../actions/actionTypes';

const initialState = {
  data: [],
  pending: false,
  error: null
};

export default function getEmailsReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET:
      return {
        data: [],
        pending: true,
        error: null
      };
    case Actions.GET_SUCCESS:
      return {
        data: action.data,
        pending: false,
        error: null
      };
    case Actions.GET_FAILURE:
      return {
        pending: false,
        error: action.error,
        data: []
      };
    default:
      return state;
  }
}

export const getEmails = state => state.data;
export const getEmailsPending = state => state.pending;
export const getEmailsFailure = state => state.error;
