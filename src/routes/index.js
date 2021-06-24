const express = require('express');
const usersRouter = require('./users');
const authRouter = require('./auth');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/', authRouter);

module.exports = router;
