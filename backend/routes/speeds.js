const express = require('express');
const bodyParser = require('body-parser');

class SpeedsRouter extends express.Router {
  constructor(database) {
    super();
    this.db = database;

    this.use(bodyParser.urlencoded({ extended: false }));
    this.use(bodyParser.json());

    this.get('/one/:datetime', (req, res) => {
      if (!req.params.datetime) {
        res.send({error: 'missing datetime parameter'});
      } else {
        this.db.collection('speeds').find({
          dateTime: {
            $eq: parseFloat(req.params.datetime)
          }
        }).toArray((err, result) => {
          if (err) res.send(err);
          else res.json(...result);
        });
      }
    });

    this.get('/many', (req, res) => {
      if (!req.query.from && !req.query.to) {
        res.send({error: 'missing query parameters'});
      } else {
        this.db.collection('speeds').find({
          dateTime: {
            $gte: parseFloat(req.query.from),
            $lte: parseFloat(req.query.to)
          }
        }).toArray((err, result) => {
          if (err) res.send(err);
          else res.send(result);
        });
      }
    });
  }
}

module.exports = SpeedsRouter;
