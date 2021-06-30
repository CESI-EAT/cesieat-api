const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();
const { convertImage } = require('../middlewares/images.middleware');

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retrieve a list of JSON user
 *    description: Retrieve the complete list of tags descripting the stores for search purpose
 *    responses:
 *       200:
 *         description: list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: tag's id
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: tag's name
 *                         example: jonh
 */
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
