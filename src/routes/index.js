const express = require('express');
const usersRouter = require('./users.router');
const storesRouter = require('./stores.router');
const authRouter = require('./auth.router');

const router = express.Router();

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/stores', storesRouter);

module.exports = router;
