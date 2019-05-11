import {SPEED_TEST_ACTIONS as Actions} from '../actions/actionTypes';

const initialState = {
  data: {},
  loading: false,
  error: null
};

export default function speedTestReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET:
      return {
        data: {},
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
        data: {}
      };
    default:
      return state;
  }
}

export const speedTest = state => state.data;
export const speedTestLoading = state => state.loading;
export const speedTestError = state => state.error;
