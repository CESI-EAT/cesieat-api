const mongoose = require('mongoose');

const database = {};

var DATABASE_URL = process.env.DATABASE_URL || 'app.morse-messenger.com';

database.connect = async () => {
  const url = `mongodb://${DATABASE_URL}/cesieat`;
  console.log('url: ', url);
  await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).catch((err) => {
    console.log('Exiting from thrown error', err);
    process.exit(1);
  });
  database.db = mongoose.connection;
};

module.exports = database;
