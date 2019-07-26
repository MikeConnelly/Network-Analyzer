const nodemailer = require('nodemailer');
const _remove = require('lodash/remove');
const _isEmpty = require('lodash/isEmpty');
const dayInMilliSeconds = 86400000;
const mailer = { transporter: null };
const dailyList = [];
const weeklyList = [];
const monthlyList = [];

function setupMailer(db) {
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

function updateMailer(address, password) {
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
  startDayCycle();
}

function pushToMailLists(email, frequency) {
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

function removeFromMailLists(email) {
  _remove(dailyList, email);
  _remove(weeklyList, email);
  _remove(monthlyList, email);
}

async function sendUpdateEmail(address) {
  if (!mailer.transporter) return;
  const mailOptions = {
    from: 'Speedtester',
    to: address,
    subject: 'Your Recent Network Speeds',
    text: '',
    html: ''
  };
  let info = await transporter.sendMail(mailOptions);
  console.log('Error message: ' + info.response);
}

async function sendFirstEmail(address) {
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

function startDayCycle() {
  setInterval(() => {
    const d = new Date();
    const day = d.getDay();
    const date = d.getDate();
    dailyList.forEach(address => sendUpdateEmail(address));
    if (day === 0) {
      weeklyList.forEach(address => sendUpdateEmail(address));
    }
    if (date === 1) {
      monthlyList.forEach(address => sendUpdateEmail(address));
    }
  }, dayInMilliSeconds);
}

module.exports = {setupMailer, updateMailer, sendFirstEmail, pushToMailLists, removeFromMailLists};
