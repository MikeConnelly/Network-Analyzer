import {PUT_MAILER_ACTIONS as Actions} from '../../actions/actionTypes';

const initialState = {
  error: null
};

export default function setMailerReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.PUT_FAILURE:
      return {
        error: action.error
      };
    default:
      return state;
  }
}
