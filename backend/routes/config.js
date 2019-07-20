const express = require('express');
const bodyParser = require('body-parser');
const updateSpeedtesterFrequency = require('../services/speedtester').updateSpeedtesterFrequency;

class ConfigRouter extends express.Router {
  constructor(database) {
    super();
    this.collection = database.collection('config');
    this.configQuery = {
      docName: {$eq: 'config'}
    };

    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(bodyParser.json());

    this.route('/frequency')
      .get((req, res) => {
        this.collection.find({}).toArray((err, result) => {
          if (err) res.status(400).send({ message: 'error getting frequency' });
          else res.json({ frequency: result[0].frequency });
        });
      })
      .put((req, res) => {
        if (!req.body.frequency) {
          res.status(400).send({ message: 'missing frequency parameter' });
        } else {
          const update = {
            $set: {frequency: parseInt(req.body.frequency)}
          };
          this.collection.updateOne(this.configQuery, update);
          updateSpeedtesterFrequency(req.body.frequency);
        }
      })
    
    this.route('/map')
      .get((req, res) => {
        this.collection.find({}).toArray((err, result) => {
          if (err) {
            res.status(400).send({ message: 'error getting map api key' });
          } else {
            const configDoc = result[0];
            if (configDoc.hasOwnProperty('map')) {
              res.json({ map: configDoc.map });
            } else {
              res.json({ map: null });
            }
          }
        })
      })
      .put((req, res) => {
        if (!req.body.map) {
          res.status(400).send({ message: 'missing map key' });
        } else {
          const update = {$set: {map: req.body.map}};
          this.collection.updateOne(this.configQuery, update);
        }
      })
      .delete((req, res) => {
        const update = {$set: {map: ""}};
        this.collection.updateOne(this.configQuery, update);
      })
    
    this.route('/mailer')
      .get((req, res) => {
        this.collection.find({}).toArray((err, result) => {
          if (err) {
            res.status(400).send({ message: 'error getting mailer credentials' });
          } else {
            const configDoc = result[0];
            if (configDoc.hasOwnProperty('mailer')) {
              res.json({ user: configDoc.mailer.user, pass: configDoc.mailer.pass });
            } else {
              res.json({ user: null, pass: null });
            }
          }
        });
      })
      .put((req, res) => {
        if (!req.body.user && !req.body.pass) {
          res.status(400).send({ message: 'missing username or password' });
        } else {
          const update = {
            $set: {
              'mailer.user': req.body.user,
              'mailer.pass': req.body.pass
            }
          }
          this.collection.updateOne(this.configQuery, update);
        }
      })
      .delete((req, res) => {
        const update = {
          $set: {
            'mailer.user': "",
            'mailer.pass': ""
          }
        }
        this.collection.updateOne(this.configQuery, update);
      })

    this.put('/admin', (req, res) => {
      if (!req.body.user && !req.body.pass) {
        res.status(400).send({ message: 'missing username or password' });
      } else {
        const update = {
          $set: {
            'admin.user': req.body.user, 
            'admin.pass': req.body.pass
          }
        }
        this.collection.updateOne(this.configQuery, update);
      }
    });
  }
}

module.exports = ConfigRouter;
