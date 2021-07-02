const express = require('express');
const usersRouter = require('./users.router');
const storesRouter = require('./stores.router');
const authRouter = require('./auth.router');
const tagsRouter = require('./tags.router');
const logsRouter = require('./logs.router');
const ordersRouter = require('./orders.router');
const stripeRouter = require('./stripe.router');
const { isLoggedIn } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use('/', authRouter);
router.use('/users', usersRouter);
router.use('/stores', storesRouter);
router.use('/tags', tagsRouter);
router.use('/logs', isLoggedIn, logsRouter);
router.use('/orders', isLoggedIn, ordersRouter);
router.use('/stripe', stripeRouter);

module.exports = router;
