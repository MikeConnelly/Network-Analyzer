import updateDownloadFile from '../utils/downloadSetup';
const filePath = `${__dirname}/../data/data.json`;

export default (route, app, db) => {
  app.get(`${route}/`, async (req, res) => {
    await updateDownloadFile(db);
    res.download(filePath);
  });
}
