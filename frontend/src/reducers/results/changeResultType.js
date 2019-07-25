import {CHANGE_RESULT_TYPE as Actions} from '../../actions/actionTypes';

const initialState = {
  advanced: false
};

export default function changeResultTypeReducer(state=initialState, action) {
  switch (action.type) {
    case Actions.TOGGLE_TRUE:
      return { advanced: true };
    case Actions.TOGGLE_FALSE:
      return { advanced: false };
    default:
      return state;
  }
};

export const getResultType = state => state.advanced;
