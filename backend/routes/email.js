const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

class EmailRouter extends express.Router {
  constructor(database) {
    super();
    this.db = database;

    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(bodyParser.json());

    this.route('/')
      .post((req, res) => {
        const email = _.get(req.body, 'email', undefined);
        const options = _.get(req.body, 'options', undefined);
        if (!email) {
          res.send({error: 'no email provided'});
        } else {
          const collection = this.db.collection('maillist');
          const doc = {
            email: email,
            options: options
          };
          const replace = collection.replaceOne({email: email}, doc, {upsert: true});
          if (replace.matchedCount > 0) {
            _.remove(dailyList, email),
            _.remove(weeklyList, email),
            _.remove(monthlyList, email)
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
          const doc = collection.find({email: email});
          const freq = doc.options.frequency;
          collection.deleteOne({email, email});
          switch (freq) {
            case 'daily':
              _.remove(dailyList, address => address === email);
              break;
            case 'weekly':
              _.remove(weeklyList, address => address === email);
              break;
            case 'monthly':
              _.remove(monthlyList, address => address === email);
              break;
            default:
              break;
          }
        }
      })

    this.get('/all', (req, res) => {
      this.db.collection('maillist').find({}).toArray((err, result) => {
        if (err) {
          res.send(err)
        } else {
          result = result.map(doc => doc.email);
          res.json(result);
        }
      });
    });
  }
}

module.exports = EmailRouter;
