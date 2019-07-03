const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const MongoClient = require('mongodb').MongoClient;
const checkForConfig = require('./utils/configSetup');
const EmailRouter = require('./routes/email');
const SpeedsRouter = require('./routes/speeds');
const SpeedtestRouter = require('./routes/speedtest');
const ConfigRouter = require('./routes/config');
const setupMailer = require('./services/mailer').setupMailer;
const setupSpeedtester = require('./services/speedtester');
const mongoURL = config.get('Database.url');
const dbname = config.get('Database.name');
const port = config.get('Server.port');

const app = express();
const client = new MongoClient(mongoURL, { useNewUrlParser: true });

client.connect().then(() => {

  console.log('mongo connected');
  const db = client.db(dbname);

  checkForConfig(db);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api/speedtest', new SpeedtestRouter());
  app.use('/api/speeds', new SpeedsRouter(db));
  app.use('/api/email', new EmailRouter(db));
  app.use('/api/config', new ConfigRouter(db));

  setupMailer(db);
  setupSpeedtester(db);

  app.listen(port, () => console.log(`listening on port ${port}`));
});

process.on('SIGINT', () => {
  client.close();
  process.exit();
});
