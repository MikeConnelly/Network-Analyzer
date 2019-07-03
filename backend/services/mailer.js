const nodemailer = require('nodemailer');
const dayInMilliSeconds = 86400000;
const mailer = { transporter: null };
const dailyList = [];
const weeklyList = [];
const monthlyList = [];

function setupMailer(db) {
  db.collection('config').find({docName: {$eq: 'config'}}).toArray((err, result) => {
    if (err) throw err;
    const config = result[0];
    if (!config.hasOwnProperty('mailer.email') || !config.hasOwnProperty('mailer.password')) {
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

function setupMailLists(db) {
  db.collection('maillist').find({}).toArray((err, result) => {
    if (err) throw err;
    result.forEach(doc => {
      pushToMailLists(doc.email, doc.options.frequency);
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

function sendUpdateEmail(address) {
  if (!mailer.transporter) return;
  const mailOptions = {
    from: fromEmail,
    to: address,
    subject: 'Network Speed Update',
    text: '',
    html: ''
  };
  /*transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/
}

function sendFirstEmail(address) {
  if (!mailer.transporter) return;
  const mailOptions = {
    from: '',
    to: address,
    subject: 'Network Speed Update',
    text: '',
    html: ''
  };
  /*transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/
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

module.exports = {setupMailer, sendFirstEmail, pushToMailLists};
