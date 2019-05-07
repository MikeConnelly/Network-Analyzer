const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const speedTest = require('speedtest-net');
const nodemailer = require('nodemailer');
const fromEmail = 'example@gmail.com';
const fromPass = 'qwerty123'
const testInterval = 30000;
const emailInterval = 100000000000;
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

client.connect().then(() => {

  console.log('mongo connected');
  const db = client.db(dbname);
  // var col = db.collection('documents').drop()

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
      const cursor = db.collection('documents').find({
        dateTime: {
          $gte: parseFloat(req.query.from), 
          $lte: parseFloat(req.query.to)
        }
      }).toArray((err, result) => {
        res.send(result);
      });
    }
  });

  app.post('/api/addemail/', (req, res) => {
    const email = req.body.email;
    if (!email) {
      res.send({error: 'no email provided'});
    } else {
      const collection = db.collection('maillist');
      collection.insertOne(email);
    }
  });

  app.listen(port, () => console.log(`listening on port ${port}`));

  beginSpeedTestLoop(db);
  /*setInterval(() => {
    insertCurrentSpeed(db);
  }, interval);

  setInterval(() => {
    //sendEmail(db);
  }, interval);*/
});

async function beginSpeedTestLoop(db) {
  setInterval(() => {
    insertCurrentSpeed(db);
  }, testInterval);
};

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

function sendEmail(db) {
  const mailList = db.collection('maillist');
  const recipients = mailList.find({});
  const mailOptions = {
    from: fromEmail,
    to: recipients.join(','),
    subject: 'Network Speed Update',
    text: '' // or html: 
  };
  transporter.sendEmail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
