import {combineReducers} from 'redux';
import getRecent from './getRecent';
import getSpeed from './getSpeed';

export default combineReducers({ getRecent, getSpeed });
