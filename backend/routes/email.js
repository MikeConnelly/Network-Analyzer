const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const sendFirstEmail = require('../services/mailer').sendFirstEmail;
const pushToMailLists = require('../services/mailer').pushToMailLists;
const removeFromMailLists = require('../services/mailer').removeFromMailLists;

class EmailRouter extends express.Router {
  constructor(database) {
    super();
    this.db = database;

    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(bodyParser.json());

    this.route('/')
      .put((req, res) => {
        const email = _.get(req.body, 'email', undefined);
        const options = _.get(req.body, 'options', undefined);
        if (!email) {
          res.status(400).send({ message: 'no email provided' });
        } else {
          const collection = this.db.collection('maillist');
          const doc = {
            address: email,
            options: options
          };
          const replace = collection.replaceOne({address: email}, doc, {upsert: true});
          if (replace.matchedCount > 0) {
            removeFromMailLists(email);
          } else {
            sendFirstEmail(email);
          }
          pushToMailLists(email, options.frequency);
        }
      })
      .delete((req, res) => {
        const email = _.get(req.body, 'email', undefined);
        if (email) {
          const collection = this.db.collection('maillist');
          collection.deleteOne({address: email});
          removeFromMailLists(address);
        }
      })

    this.get('/all', (req, res) => {
      this.db.collection('maillist').find({}).toArray((err, result) => {
        if (err) res.status(400).send({ message: err });
        else res.json(result);
      });
    });
  }
}

module.exports = EmailRouter;
