import {GET_SPEED_BEGIN, GET_SPEED_SUCCESS, GET_SPEED_FAILURE} from '../actions/getSpeed';

const initialState = {
  data: [],
  loading: false,
  error: null
};

export default function getSpeedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SPEED_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_SPEED_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case GET_SPEED_FAILURE:
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

export const getSpeed = state => state.data;
export const getSpeedLoading = state => state.loading;
export const getSpeedError = state => state.error;
