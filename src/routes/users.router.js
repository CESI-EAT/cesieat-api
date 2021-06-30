const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();
const { convertImage } = require('../middlewares/images.middleware');

/* GET users listing. */
router.get('/', userController.findAll);

/* GET on user by it's ID */
router.get('/:id', userController.findUser);

router.post('/', convertImage, userController.createUser);

/* Update user */
router.patch('/:id', userController.updateUser);

/* Delete one user based on ID */
router.delete('/:id', userController.deleteUser);

module.exports = router;
