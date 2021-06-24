const express = require('express');
const usersRouter = require('./users');
const storesRouter = require('./stores');
const authRouter = require('./auth');

const router = express.Router();

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/stores', storesRouter);

module.exports = router;
