import {combineReducers} from 'redux';
import getRecent from './getRecent';
import speedTest from './speedTest';
import addEmail from './addEmail';
import removeEmail from './removeEmail';

const rootReducer = combineReducers({ getRecent, speedTest, addEmail, removeEmail });

export default rootReducer;
