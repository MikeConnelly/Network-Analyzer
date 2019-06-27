const express = require('express');
const config = require('config');
const testInterval = config.get('Collection.interval');

class ConfigRouter extends express.Router {
  constructor() {
    super();

    this.route('/frequency')
      .get((req, res) => {
        res.json({ frequency: testInterval });
      })
      .put((req, res) => {
        if (!req.body.frequency) {
          res.status(400).send({ message: 'missing frequency parameter' });
        } else {
          testInterval = req.body.frequency;
        }
      })
  }
}

module.exports = ConfigRouter;
