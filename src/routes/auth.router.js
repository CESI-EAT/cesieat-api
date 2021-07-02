const express = require('express');
const authController = require('../controllers/auth.controller');
const { isLoggedIn, requireAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', isLoggedIn, authController.logout);
router.get('/me', isLoggedIn, authController.getProfile);
router.get('/myorder', isLoggedIn, authController.getMyOrder);
router.get('/roles', authController.getRoles);
router.post('/change-password', isLoggedIn, authController.changePassword);

module.exports = router;
