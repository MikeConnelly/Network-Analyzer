import {combineReducers} from 'redux';
import getRecent from './getRecent';
import speedTest from './speedTest';
import addEmail from './addEmail';

const rootReducer = combineReducers({ getRecent, speedTest, addEmail });

export default rootReducer;
