function checkForConfig(db) {
  return new Promise((resolve, reject) => {
    db.listCollections().toArray((err, result) => {
      if (err) reject(err);
      const collections = result.map(col => col.name);
      if (!collections.includes('config')) {
        console.log('config collection does not exist, creating default config...');
        createConfigCollection(db)
          .then(() => resolve());
      } else {
        resolve();
      }
    });
  });
}

function createConfigCollection(db) {
  return new Promise((resolve, reject) => {
    const resolveAndCallback = (err, collection) => {
      setDefaultConfig(err, collection)
        .then(() => resolve());
    };
    db.createCollection('config', {
      max: 1,
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['docName', 'frequency', 'admin.user', 'admin.pass'],
          properties: {
            docName: {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            frequency: {
              bsonType: 'int',
              description: 'must be an int and is required'
            },
            map: {
              bsonType: 'string',
              description: 'must be a string and is not required'
            },
            'mailer.email': {
              bsonType: 'string',
              description: 'must be a string and is not required'
            },
            'mailer.pass': {
              bsonType: 'string',
              description: 'must be a string and is not required'
            },
            'admin.user': {
              bsonType: 'string',
              description: 'must be a string and is required'
            },
            'admin.pass': {
              bsonType: 'string',
              description: 'must be a string and is requried'
            }
          }
        }
      },
      validationAction: 'error'
    }, resolveAndCallback)
  });
}

function setDefaultConfig(err, collection) {
  return new Promise((resolve, reject) => {
    if (err) reject(err);
    else {
      const defaultConfig = {
        docName: 'config',
        frequency: 300000,
        admin: {
          user: 'admin',
          pass: 'password'
        }
      };
      collection.insertOne(defaultConfig);
      console.log('default config created');
      resolve();
    }
  });
}

module.exports = checkForConfig;
