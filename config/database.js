const database = {}

var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'

database.connect = async () => {
    /**
 * Import MongoClient & connexion à la DB
 */
  const MongoClient = require('mongodb').MongoClient;
  const url = `mongodb://devroot:devroot@${DATABASE_URL}/`;
  const dbName = 'cesi-eat';
  let db
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((client) => {
    console.log("Connected successfully to MongoDB Server");
    db = client.db(dbName);
    database.db = db
  })
  .catch((err) => {
    console.log('Exiting from thrown error', err);
    process.exit(1);
  })
}

module.exports = database