const speedtestRouter = require('./speedtest');
const speedsRouter = require('./speeds');
const emailRouter = require('./email');
const configRouter = require('./config');
const downloadRouter = require('./download');

module.exports = (app, db) => {
  speedtestRouter('/api/speedtest', app);
  speedsRouter('/api/speeds', app, db);
  emailRouter('/api/email', app, db);
  configRouter('/api/config', app, db);
  downloadRouter('/api/download', app, db);
}
