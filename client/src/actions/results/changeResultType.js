import {CHANGE_RESULT_TYPE as Actions} from '../actionTypes';

export const toggleTrue = () => {
  return {
    type: Actions.TOGGLE_TRUE
  }
};

export const toggleFalse = () => {
  return {
    type: Actions.TOGGLE_FALSE
  }
};

export const changeResultType = value => {
  return function(dispatch) {
    value ? dispatch(toggleFalse()) : dispatch(toggleTrue());
  }
};
