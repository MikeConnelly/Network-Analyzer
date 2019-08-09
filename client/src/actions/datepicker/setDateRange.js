import { SET_DATE_RANGE as Actions } from '../actionTypes';

export const setStartDate = date => {
  return function(dispatch) {
    dispatch({
      type: Actions.SET_START,
      date: date
    });
  }
}

export const setEndDate = date => {
  return function(dispatch) {
    dispatch({
      type: Actions.SET_END,
      date: date
    });
  }
}
