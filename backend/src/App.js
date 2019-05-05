const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const speedTest = require('speedtest-net');
const interval = 1000;
const mongo_url = 'mongodb://localhost:27017';
const dbname = 'local';
const port = 3000;
const app = express()
const client = new MongoClient(mongo_url, {useNewUrlParser: true});

process.on('SIGINT', () => {
  client.close();
  process.exit();
});

client.connect().then(() => {

  console.log('mongo connected');
  const db = client.db(dbname);

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
      const cursor = db.collection('documents').find({}, {
        dateTime: {$gt: req.query.from},
        dateTime: {$lt: req.query.to}
      }).toArray((err, result) => {
        console.log(result);
      });
      res.send(cursor);
    }
  });

  app.listen(port, () => console.log(`listening on port ${port}`));

  setInterval(() => {
    insertCurrentSpeed(db);
  }, interval);
});

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
