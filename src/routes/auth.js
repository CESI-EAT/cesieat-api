const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', passport.authenticate('jwt', { session: false }), authController.logout);
router.get('/profile', passport.authenticate('jwt', { session: false }), authController.getProfile);

module.exports = router;
