const express = require('express');
const authController = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', isLoggedIn, authController.logout);
router.get('/me', isLoggedIn, authController.getProfile);

module.exports = router;
