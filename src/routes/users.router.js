const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();
const { convertImage } = require('../middlewares/images.middleware');

/* GET users listing. */
router.get('/', userController.findAll);

/* GET on user by it's ID */
router.get('/:id', userController.findUser);

/* GET on user by it's ID */
router.get('/:id/orders', userController.getOrders);

router.post('/', convertImage, userController.createUser);

/* Update user */
router.patch('/', userController.updateUser);

/* Delete one user based on ID */
router.delete('/:id', userController.deleteUser);

module.exports = router;
