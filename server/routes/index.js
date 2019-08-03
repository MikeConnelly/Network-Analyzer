import speedtestRouter from './speedtest';
import speedsRouter from './speeds';
import emailRouter from './email';
import configRouter from './config';
import downloadRouter from './download';

export default (app, db) => {
  speedtestRouter('/api/speedtest', app);
  speedsRouter('/api/speeds', app, db);
  emailRouter('/api/email', app, db);
  configRouter('/api/config', app, db);
  downloadRouter('/api/download', app, db);
}
