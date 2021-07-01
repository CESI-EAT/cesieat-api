const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes');
const sql = require('./models');
const mongo = require('./services/mongo');
const fs = require('fs');
const http = require('http');
const https = require('https');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

require('../config/passport')(passport);

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for CESI Eat',
    description: 'This API is made to work with the front end application CESI Eat',
    version: '1.0.0',
  },
};

const app = express();

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// var corsOptions = {
//   origin: [
//     'https://localhost:9377',
//     'https://app.morse-messenger.com',
//     'http://localhost:8080',
//     'http://127.0.0.1:8080',
//   ],
//   credentials: true,
// };
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use(passport.initialize());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ success: false, message: err.message });
});

const key = fs.readFileSync('src/ssl/privkey1.pem', 'utf8');
const cert = fs.readFileSync('src/ssl/cert1.pem', 'utf8');

const credentials = {
  key,
  cert,
};

const hServer =
  process.env.NODE_ENV === 'development'
    ? http.createServer(app)
    : https.createServer(credentials, app);

const socketOptions = {
  /* ... */
};
const io = require('socket.io')(hServer, socketOptions);

const { configureSocket } = require('./services/socket.js');
configureSocket(io);

/*app.listen(3000, async () => {
  await sql.sequelize.sync({ force: false, logging: console.log });
  await mongo.connect();
  console.log('Databases connected !');
});*/

hServer.listen(3000, async () => {
  await sql.sequelize.sync({ force: false, logging: console.log });
  await mongo.connect();
  console.log('Databases connected !');
  console.log('NODE_ENV', process.env.NODE_ENV);
});

module.exports = hServer;
