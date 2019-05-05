import {getRecentBegin, getRecentSuccess, getRecentFailure} from './actions/getRecent';

function fetchRecent() {
  return dispatch => {
    dispatch(getRecentBegin());
    fetch(`/api/getspeeds?from=${1557091298970}&to=${1557091328970}`)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw(res.error);
        }
        dispatch(getRecentSuccess(res.data));
        return res.data;
      })
      .catch(error => {
        dispatch(getRecentFailure(error));
      });
  }
}

export default fetchRecent;
// put module in actions/index.js