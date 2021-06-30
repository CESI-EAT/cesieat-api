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

var corsOptions = {
  origin: ['https://localhost:9377', 'https://app.morse-messenger.com'],
  credentials: true,
};
app.use(cors(corsOptions));
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

app.listen(3000, async () => {
  await sql.sequelize.sync({ force: false, logging: console.log });
  await mongo.connect();
  console.log('Databases connected !');
});

module.exports = app;
