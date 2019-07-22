import {GET_MAILER_ACTIONS as Actions} from '../../actions/actionTypes';

const initialState = {
  data: {},
  pending: false,
  error: null
};

export default function getMailerReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET:
      return {
        data: {},
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
        data: {}
      };
    default:
      return state;
  }
}

export const getMailer = state => state.data;
export const getMailerPending = state => state.pending;
export const getMailerError = state => state.error;
