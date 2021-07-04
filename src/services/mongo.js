const mongoose = require('mongoose');
require('dotenv').config();

const database = {};

var options = {
  user: process.env.MONGO_ADMIN,
  pass: process.env.MONGO_PASSWORD,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

database.connect = async () => {
  console.log(options);
  const url = `mongodb://${process.env.MONGO_URL}?authSource=admin`;
  await mongoose.connect(url, options).catch((err) => {
    console.log('Exiting from thrown error', err);
    process.exit(1);
  });
  database.db = mongoose.connection;
};

module.exports = database;
