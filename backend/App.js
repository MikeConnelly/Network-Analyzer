const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const speedTest = require('speedtest-net');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fromEmail = 'example@gmail.com';
const fromPass = 'qwerty123'
const testInterval = 300000;
const mongo_url = 'mongodb://localhost:27017';
const dbname = 'local';
const port = 5000;
const app = express()
const client = new MongoClient(mongo_url, {useNewUrlParser: true});

process.on('SIGINT', () => {
  client.close();
  process.exit();
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: fromPass
  }
});

const dailyList = [];
const weeklyList = [];
const monthlyList = [];

client.connect().then(() => {

  console.log('mongo connected');
  const db = client.db(dbname);
  // var col = db.collection('documents').drop()
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/api/speedtest/', (req, res) => {
    var test = speedTest({maxTime: 5000});
    test.on('data', data => {
      res.send(data);
    });
    test.on('error', err => {
      res.send(err);
    });
  });

  app.get('/api/getspeeds/', (req, res) => {
    if (!req.query.from && !req.query.to) {
      res.send({error: 'missing parameters'});
    } else {
      db.collection('documents').find({
        dateTime: {
          $gte: parseFloat(req.query.from), 
          $lte: parseFloat(req.query.to)
        }
      }).toArray((err, result) => {
        if (err) res.send(err);
        else res.send(result);
      });
    }
  });

  app.post('/api/addemail/', (req, res) => {
    const email = _.get(req.body, 'email', undefined);
    const options = _.get(req.body, 'options', undefined);
    if (!email) {
      res.send({error: 'no email provided'});
    } else {
      const collection = db.collection('maillist');
      const doc = {
        email: email,
        options: options
      };
      collection.insertOne(doc);
      pushToMailLists(email, options.frequency);
      sendFirstEmail(email);
    }
  });

  setupMailLists(db);

  beginSpeedTestLoop(db);

  app.listen(port, () => console.log(`listening on port ${port}`));
});

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
    case 'weekly':
      weeklyList.push(email);
    case 'monthly':
      monthlyList.push(email);
    default:
      dailyList.push(email);
  }
}

function beginSpeedTestLoop(db) {
  setInterval(() => {
    insertCurrentSpeed(db);
  }, testInterval);
}

function insertCurrentSpeed(db) {
  const collection = db.collection('documents');
  const currentDateTime = Date.now();
  var test = speedTest({maxTime: 5000});
  test.on('data', data => {
    data.dateTime = currentDateTime;
    collection.insertOne(data);
  });
  test.on('error', err => {
    err.dateTime = currentDateTime;
    collection.insertOne(err);
  });
}

function sendUpdateEmail(address) {
  const mailOptions = {
    from: fromEmail,
    to: address,
    subject: 'Network Speed Update',
    text: '',
    html: ''
  };
  transporter.sendEmail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function sendFirstEmail(address) {
  const mailOptions = {
    from: '',
    to: address,
    subject: 'Network Speed Update',
    text: '',
    html: ''
  };
  transporter.sendEmail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
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
  }, 86400000);
}
