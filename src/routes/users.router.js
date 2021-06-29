const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();

/* GET users listing. */
router.get('/', userController.findAll);

/* GET on user by it's ID */
router.get('/:id', userController.findUser);

/* Create one new user */
router.post('/', userController.createUser);

/* Update user */
router.patch('/', userController.updateUser);

/* Delete one user based on ID */
router.delete('/:id', userController.deleteUser);

module.exports = router;
