const { updateDownloadFile } = require('../utils/downloadSetup');
const filePath = `${__dirname}/../data/data.json`;

module.exports = (route, app, db) => {
  app.get(`${route}/`, async (req, res) => {
    await updateDownloadFile(db);
    res.download(filePath);
  });
}
