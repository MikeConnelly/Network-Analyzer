import speedTest from 'speedtest-net';

export default (route, app) => {
  app.get(`${route}/`, (req, res) => {
    const test = speedTest({maxTime: 5000});
    test.on('data', data => {
      const dataWithDateTime = Object.assign({}, data, { dateTime: Date.now() });
      res.json(dataWithDateTime);
    });
    test.on('error', err => {
      res.status(400).send({message: 'speedtest error'});
    });
  });
}
