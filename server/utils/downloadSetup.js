const fse = require('fs-extra');
const _sortBy = require('lodash');
const filePath = `${__dirname}/../data/data.json`;
const dayInMilliSeconds = 86400000;

async function createDownloadFile(db) {
  const speeds = await db.collection('speeds').find({}).toArray();
  _sortBy(speeds, ['dateTime']);
  const defaultFile = {
    lastUpdated: Date.now(),
    speeds: speeds
  };
  return new Promise((resolve, reject) => {
    fse.outputFile(filePath, JSON.stringify(defaultFile))
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

async function updateDownloadFile(db) {
  if (!fse.existsSync(filePath)) {
    return createDownloadFile(db);
  } else {
    const file = require(filePath);
    const lastUpdated = file.lastUpdated;
    const newSpeeds = await db.collection('speeds').find({dateTime: {$gt: lastUpdated}}).toArray();
    _sortBy(newSpeeds, ['dateTime']);
    file.speeds.push(...newSpeeds);
    file.lastUpdated = Date.now();
    return new Promise((resolve, reject) => {
      fse.outputFile(filePath, JSON.stringify(file))
        .then(() => resolve())
        .catch(err => reject(err))
    });
  }
}

function downloadUpdateLoop(db) {
  setInterval(() => {
    updateDownlaodFile(db);
  }, dayInMilliSeconds);
}

module.exports = { updateDownloadFile, downloadUpdateLoop };
