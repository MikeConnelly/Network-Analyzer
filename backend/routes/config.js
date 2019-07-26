const { updateSpeedtesterFrequency } = require('../services/speedtester');
const { updateMailer } = require('../services/mailer');

module.exports = (route, app, db) => {
  const collection = db.collection('config');
  const configQuery = {
    docName: {$eq: 'config'}
  };

  app.route(`${route}/frequency`)
    .get((req, res) => {
      collection.find({}).toArray((err, result) => {
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
        collection.updateOne(configQuery, update);
        updateSpeedtesterFrequency(req.body.frequency);
      }
    });
  
  app.route(`${route}/map`)
    .get((req, res) => {
      collection.find({}).toArray((err, result) => {
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
        collection.updateOne(configQuery, update);
      }
    })
    .delete((req, res) => {
      const update = {$set: {map: ""}};
      collection.updateOne(configQuery, update);
    });
  
  app.route(`${route}/mailer`)
    .get((req, res) => {
      collection.find({}).toArray((err, result) => {
        if (err) {
          res.status(400).send({ message: 'error getting mailer credentials' });
        } else {
          const configDoc = result[0];
          if (configDoc.hasOwnProperty('mailer')) {
            res.json({ user: configDoc.mailer.user, pass: configDoc.mailer.pass });
          } else {
            res.json({ user: '', pass: '' });
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
        collection.updateOne(configQuery, update);
        updateMailer(req.body.user, req.body.pass);
      }
    })
    .delete((req, res) => {
      const update = {
        $set: {
          'mailer.user': "",
          'mailer.pass': ""
        }
      }
      collection.updateOne(configQuery, update);
      updateMailer(null);
    });

  app.put(`${route}/admin`, (req, res) => {
    if (!req.body.user && !req.body.pass) {
      res.status(400).send({ message: 'missing username or password' });
    } else {
      const update = {
        $set: {
          'admin.user': req.body.user, 
          'admin.pass': req.body.pass
        }
      }
      collection.updateOne(configQuery, update);
    }
  });
}
