import nodemailer from 'nodemailer';
import _remove from 'lodash/remove';
import _isEmpty from 'lodash/isEmpty';
import generateEmail from '../utils/emailSetup';
const dayInMilliSeconds = 86400000;
const mailer = { transporter: null };
const dailyList = [];
const weeklyList = [];
const monthlyList = [];

export function setupMailer(db) {
  db.collection('config').find({docName: {$eq: 'config'}}).toArray((err, result) => {
    if (err) throw err;
    const config = result[0];
    if (!config.hasOwnProperty('mailer.email') 
        || !config.hasOwnProperty('mailer.password') 
        || _isEmpty(config.mailer.email) 
        || _isEmpty(config.mailer.password)) {
      console.log('no mailer setup');
    } else {
      mailer.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.mailer.email,
          pass: config.mailer.password
        }
      });
    }
    setupMailLists(db);
  });
}

export function updateMailer(address, password) {
  if (address === null) {
    mailer.transporter = null;
  } else {
    mailer.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: address,
        pass: password
      }
    });
  }
}

function setupMailLists(db) {
  db.collection('maillist').find({}).toArray((err, result) => {
    if (err) throw err;
    result.forEach(doc => {
      pushToMailLists(doc.address, doc.options.frequency);
    });
  });
  startDayCycle(db);
}

export function pushToMailLists(email, frequency) {
  switch (frequency) {
    case 'daily':
      dailyList.push(email);
      break;
    case 'weekly':
      weeklyList.push(email);
      break;
    case 'monthly':
      monthlyList.push(email);
      break;
    default:
      break;
  }
}

export function removeFromMailLists(email) {
  _remove(dailyList, email);
  _remove(weeklyList, email);
  _remove(monthlyList, email);
}

async function sendUpdateEmail(address, graph) {
  if (!mailer.transporter) return;
  const mailOptions = {
    from: 'Speedtester',
    to: address,
    subject: 'Your Recent Network Speeds',
    text: '',
    html: graph
  };
  let info = await transporter.sendMail(mailOptions);
  console.log('Error message: ' + info.response);
}

export async function sendFirstEmail(address) {
  if (!mailer.transporter) return;
  const mailOptions = {
    from: 'Speedtester',
    to: address,
    subject: 'You will now recieve email notifications',
    text: ''
  };
  let info = await transporter.sendMail(mailOptions);
  console.log('Error message: ' + info.response);
}

function startDayCycle(db) {
  setInterval(() => {
    const d = new Date();
    const day = d.getDay();
    const date = d.getDate();
    if (!_isEmpty(dailyList)) {
      const dailyGraph = generateEmail(db, 'daily');
      dailyList.forEach(address => sendUpdateEmail(address, dailyGraph));
    }
    if (!_isEmpty(weeklyList) && day === 0) {
      const weeklyGraph = generateEmail(db, 'weekly');
      weeklyList.forEach(address => sendUpdateEmail(address, weeklyGraph));
    }
    if (!_isEmpty(monthlyList) && date === 1) {
      const monthlyGraph = generateEmail(db, 'monthly');
      monthlyList.forEach(address => sendUpdateEmail(address, monthlyGraph));
    }
  }, dayInMilliSeconds);
}
