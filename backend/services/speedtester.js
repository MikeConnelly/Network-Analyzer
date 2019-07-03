const speedTest = require('speedtest-net');
const speedtester = { frequency: 300000 };

function setupSpeedtester(db) {
  db.collection('config').find({docName: {$eq: 'config'}}).toArray((err, result) => {
    if (err) throw err;
    speedtester.frequency = result[0].frequency;
    beginSpeedTestLoop(db);
  });
}

function insertCurrentSpeed(db) {
  const collection = db.collection('speeds');
  const currentDateTime = Date.now();
  var test = speedTest({maxTime: 5000});
  test.on('data', data => {
    data.dateTime = currentDateTime;
    collection.insertOne(data);
  });
}

function beginSpeedTestLoop(db) {
  setInterval(() => {
    insertCurrentSpeed(db);
  }, speedtester.frequency);
}

module.exports = setupSpeedtester;
