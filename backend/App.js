const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const { MongoClient } = require('mongodb');
const checkForConfig = require('./utils/configSetup');
const EmailRouter = require('./routes/email');
const SpeedsRouter = require('./routes/speeds');
const SpeedtestRouter = require('./routes/speedtest');
const ConfigRouter = require('./routes/config');
const { setupMailer } = require('./services/mailer');
const { setupSpeedtester } = require('./services/speedtester');
const dbport = config.get('Database.port');
const dbname = config.get('Database.name');
const port = config.get('Server.port');

const env = process.env.NODE_ENV || 'development';
const proxy = env === 'production' ? 'mongodb' : 'localhost';
const mongoURL = `mongodb://${proxy}:${dbport}/`;

const app = express();

MongoClient.connect(mongoURL, {
  reconnectTries: 100, 
  reconnectInterval: 10000, 
  autoReconnect: true, 
  useNewUrlParser: true 
}, run);

async function run(err, client) {
  if (err) throw err;

  console.log(`mongo connected to ${mongoURL}`);
  const db = client.db(dbname);

  await checkForConfig(db);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use('/api/speedtest', new SpeedtestRouter());
  app.use('/api/speeds', new SpeedsRouter(db));
  app.use('/api/email', new EmailRouter(db));
  app.use('/api/config', new ConfigRouter(db));

  setupMailer(db);
  setupSpeedtester(db);

  app.listen(port, () => console.log(`listening on port ${port}`));

  process.on('SIGINT', () => {
    client.close();
    process.exit();
  });
}
