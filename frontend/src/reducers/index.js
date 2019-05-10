import {combineReducers} from 'redux';
import getRecent from './getRecent';
import speedTest from './speedTest';

const rootReducer = combineReducers({ getRecent, speedTest });

export default rootReducer;
