const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { convertImage } = require('../middlewares/images.middleware');

/**
 * @swagger
 * /tags:
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
 *                         example: italien
 */
router.get('/', userController.getAll);

/* GET on user by it's ID */
router.get('/:id', userController.getOneById);

/* Create one new user */
router.post('/', convertImage, userController.addUser);

/* Delete one user based on ID */
router.delete('/:id', userController.deleteById);

module.exports = router;
