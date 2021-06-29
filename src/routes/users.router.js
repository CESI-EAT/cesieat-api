const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { convertImage } = require('../middlewares/images.middleware');

/* GET users listing. */
router.get('/', userController.getAll);

/* GET on user by it's ID */
router.get('/:id', userController.getOneById);

/* Create one new user */
router.post('/', convertImage, userController.addUser);

/* Delete one user based on ID */
router.delete('/:id', userController.deleteById);

module.exports = router;
