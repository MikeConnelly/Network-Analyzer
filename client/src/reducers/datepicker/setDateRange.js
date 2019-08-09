import { SET_DATE_RANGE as Actions } from '../../actions/actionTypes';

const initialState = {
  startDate: null,
  endDate: null
};

export default function setDateRangeReducer(state = initialState, action) {
  switch(action.type) {
    case Actions.SET_START:
      return {
        ...state,
        startDate: action.date
      }
    case Actions.SET_END:
      return {
        ...state,
        endDate: action.date
      }
    default:
      return state
  }
}
