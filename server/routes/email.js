import { sendFirstEmail } from '../services/mailer';
import { pushToMailLists } from '../services/mailer';
import { removeFromMailLists } from '../services/mailer';

export default (route, app, db) => {
  app.route(`${route}/`)
    .put((req, res) => {
      const email = req.body.email;
      const options = req.body.options;
      if (!email) {
        res.status(400).send({ message: 'no email provided' });
      } else {
        const collection = db.collection('maillist');
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
        res.status(200).json({ doc });
      }
    })
    .delete((req, res) => {
      const email = req.body.email;
      if (email) {
        const collection = db.collection('maillist');
        collection.deleteOne({address: email});
        removeFromMailLists(email);
        res.status(200).send({ message: `${email} removed` });
      } else {
        res.status(400).send({ message: 'no email given' });
      }
    });

  app.get(`${route}/all`, (req, res) => {
    db.collection('maillist').find({}).toArray((err, result) => {
      if (err) res.status(400).send({ message: err });
      else res.json(result);
    });
  });
}
