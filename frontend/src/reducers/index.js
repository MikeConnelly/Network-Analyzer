import {combineReducers} from 'redux';
import getRecent from './speeds/getRecent';
import getOne from './speeds/getOne';
import speedTest from './speedtest/speedTest';
import getEmails from './email/getEmails';
import addEmail from './email/addEmail';
import removeEmail from './email/removeEmail';
import getFrequency from './frequency/getFrequency';
import setFrequency from './frequency/setFrequency';

const rootReducer = combineReducers({ getRecent, getOne, speedTest, getEmails, addEmail, removeEmail, getFrequency, setFrequency });

export default rootReducer;
