const speedTest = require('speedtest-net');

module.exports = (route, app) => {
  app.get(`${route}/`, (req, res) => {
    const test = speedTest({maxTime: 5000});
    test.on('data', data => {
      res.json(data);
    });
    test.on('error', err => {
      res.status(400).send({message: 'speedtest error'});
    });
  });
}
