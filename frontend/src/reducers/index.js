import { combineReducers } from 'redux';
import getRecent from './speeds/getRecent';
import getOne from './speeds/getOne';
import speedTest from './speedtest/speedTest';
import getEmails from './email/getEmails';
import addEmail from './email/addEmail';
import removeEmail from './email/removeEmail';
import getFrequency from './frequency/getFrequency';
import setFrequency from './frequency/setFrequency';
import getMailerCreds from './mailer/getMailerCreds';
import setMailerCreds from './mailer/setMailerCreds';
import changeResultType from './results/changeResultType';

const rootReducer = combineReducers({
  getRecent,
  getOne,
  speedTest,
  getEmails,
  addEmail,
  removeEmail,
  getFrequency,
  setFrequency,
  getMailerCreds,
  setMailerCreds,
  changeResultType
});

export default rootReducer;
