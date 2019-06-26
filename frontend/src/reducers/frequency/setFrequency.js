import {SET_FREQUENCY_ACTIONS as Actions} from '../../actions/actionTypes';

const initialState = {
  error: null
};

export default function setFrequencyReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.PUT_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}

export const setFrequencyError = state => state.error;
