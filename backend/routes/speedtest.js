const express = require('express');
const speedTest = require('speedtest-net');

class SpeedtestRouter extends express.Router {
  constructor() {
    super();

    this.get('/', (req, res) => {
      const test = speedTest({maxTime: 5000});
      test.on('data', data => {
        res.send(data);
      });
      test.on('error', err => {
        res.send(err);
      });
    });
  }
}

module.exports = SpeedtestRouter;
