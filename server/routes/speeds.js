export default (route, app, db) => {
  app.get(`${route}/one/:datetime`, (req, res) => {
    if (!req.params.datetime) {
      res.status(400).send({error: 'missing datetime parameter'});
    } else {
      db.collection('speeds').find({
        dateTime: {
          $eq: parseFloat(req.params.datetime)
        }
      }).toArray((err, result) => {
        if (err) res.send(err);
        else res.json(...result);
      });
    }
  });

  app.get(`${route}/many`, (req, res) => {
    if (!req.query.from && !req.query.to) {
      res.status(400).send({error: 'missing query parameters'});
    } else {
      db.collection('speeds').find({
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
