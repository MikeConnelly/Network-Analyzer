const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const { MongoClient } = require('mongodb');
const checkForConfig = require('./utils/configSetup');
const setupRoutes = require('./routes');
const { setupMailer } = require('./services/mailer');
const { setupSpeedtester } = require('./services/speedtester');
const { downloadUpdateLoop } = require('./utils/downloadSetup');
const mongoUser = config.get('Database.user');
const mongoPass = config.get('Database.password');
const mongoPort = config.get('Database.port');
const dbName = config.get('Database.name');
const port = config.get('Server.port');
const env = process.env.NODE_ENV || 'development';
const proxy = env === 'production' ? 'mongodb' : 'localhost';
const mongoURL = `mongodb://${proxy}:${mongoPort}/`;
// ${dbName}?authSource=admin
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
  const db = client.db(dbName);

  await checkForConfig(db);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  setupRoutes(app, db);
  setupMailer(db);
  setupSpeedtester(db);
  downloadUpdateLoop(db);

  app.listen(port, () => console.log(`listening on port ${port}`));

  process.on('SIGINT', () => {
    client.close();
    process.exit();
  });
}
