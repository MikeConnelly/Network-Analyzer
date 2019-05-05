import {GET_RECENT_BEGIN, GET_RECENT_SUCCESS, GET_RECENT_FAILURE} from '../actions/getRecent';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function getRecentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECENT_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_RECENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case GET_RECENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: []
      };
    default:
      return state;
  }
}

export const getRecent = state => state.data;
export const getRecentLoading = state => state.loading;
export const getRecentError = state => state.error;
