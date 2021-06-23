const mongoose = require('mongoose');

var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
const connectionString = `mongodb://${DATABASE_URL}/cesi-eat`;

mongoose
    .connect(connectionString, { useNewUrlParser: true})
    .catch((e) => { console.error('Connection error', e.message)})

const db = mongoose.connection;

module.exports = db;