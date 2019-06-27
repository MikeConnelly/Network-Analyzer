const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const speedTest = require('speedtest-net');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const _ = require('lodash');
const config = require('config');
const testInterval = config.get('Collection.interval');
const fromEmail = config.get('Mailer.email');
const fromPass = config.get('Mailer.password');
const mongo_url = config.get('Database.url');
const dbname = config.get('Database.name');
const port = config.get('Database.port');
const EmailRouter = require('./routes/email');
const SpeedsRouter = require('./routes/speeds');
const SpeedtestRouter = require('./routes/speedtest');
const ConfigRouter = require('./routes/config');

const app = express();
const client = new MongoClient(mongo_url, { useNewUrlParser: true });

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

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  /*
  app.get('/api/speedtest/', (req, res) => {
    var test = speedTest({maxTime: 5000});
    test.on('data', data => {
      res.send(data);
    });
    test.on('error', err => {
      res.send(err);
    });
  });
*/
  /*
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

  app.get('/api/getone/', (req, res) => {
    if (!req.query.datetime) {
      res.send({error: 'missing datetime parameter'});
    } else {
      db.collection('documents').find({
        dateTime: {
          $eq: parseFloat(req.query.datetime)
        }
      }).toArray((err, result) => {
        if (err) res.send(err);
        else res.json(...result);
      });
    }
  });
*/
/*
  app.get('/api/emails/', (req, res) => {
    db.collection('maillist').find({}).toArray((err, result) => {
      if (err) {
        res.send(err)
      } else {
        result = result.map(doc => doc.email);
        res.json(result);
      }
    });
  });

  app.post('/api/email/', (req, res) => {
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
      const replace = collection.replaceOne({email: email}, doc, {upsert: true});
      if (replace.matchedCount > 0) {
        _.remove(dailyList, email),
        _.remove(weeklyList, email),
        _.remove(monthlyList, email)
      } else {
        sendFirstEmail(email);
      }
      pushToMailLists(email, options.frequency);
    }
  });

  app.delete('/api/email/', (req, res) => {
    const email = _.get(req.body, 'email', undefined);
    if (email) {
      const collection = db.collection('maillist');
      const doc = collection.find({email: email});
      const freq = doc.options.frequency;
      collection.deleteOne({email, email});
      switch (freq) {
        case 'daily':
          _.remove(dailyList, address => address === email);
          break;
        case 'weekly':
          _.remove(weeklyList, address => address === email);
          break;
        case 'monthly':
          _.remove(monthlyList, address => address === email);
          break;
        default:
          break;
      }
    }
  });
*/
/*
  app.get('/api/config/frequency/', (req, res) => {
    res.json({frequency: testInterval});
  });

  app.put('/api/config/frequency/', (req, res) => {
    if (!req.body.frequency) {
      res.send({error: 'missing frequency parameter'});
    } else {
      testInterval = req.body.frequency;
    }
  });
  */

  app.use('/api/speedtest', new SpeedtestRouter());
  app.use('/api/speeds', new SpeedsRouter(db));
  app.use('/api/email', new EmailRouter(db));
  app.use('/api/config', new ConfigRouter());

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
  /*transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/
}

function sendFirstEmail(address) {
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
  }, 86400000);
}
