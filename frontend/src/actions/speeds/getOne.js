import {GET_ONE_ACTIONS as Actions} from '../actionTypes';

export const getOneBegin = () => {
  return {
    type: Actions.GET,
    pending: true
  };
};

export const getOneSuccess = content => {
  return {
    type: Actions.GET_SUCCESS,
    pending: false,
    data: content
  };
};
  
export const getOneFailure = error => {
  return {
    type: Actions.GET_FAILURE,
    pending: false,
    error: error
  };
};

export const getOne = dateTime => {
  return function(dispatch) {
    dispatch(getOneBegin());
    fetch(`/api/speeds/one/${dateTime}`)
      .then(res => res.json())
      .then(data => {
        dispatch(getOneSuccess(data));
        return data;
      })
      .catch(error => dispatch(getOneFailure(error)));
  }
}
