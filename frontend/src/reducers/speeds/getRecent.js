import {GET_RECENT_ACTIONS as Actions} from '../../actions/actionTypes';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function getRecentReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET:
      return {
        data: [],
        loading: true,
        error: null
      };
    case Actions.GET_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case Actions.GET_FAILURE:
      return {
        loading: false,
        error: action.error,
        data: []
      };
    default:
      return state;
  }
}

export const getRecent = state => state.data;
export const getRecentLoading = state => state.loading;
export const getRecentError = state => state.error;
