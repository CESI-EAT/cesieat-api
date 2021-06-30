const express = require('express');
const userController = require('../controllers/users.controller');
const router = express.Router();
const { convertImage } = require('../middlewares/images.middleware');

/**
 * @swagger
 *  components:
 *    schemas:
 *      NewUser:
 *        type: object
 *        properties:
 *          email:
 *            type: string
 *            description: user's email
 *            example: john.Smith@mail.com
 *          lastName:
 *            type: string
 *            description: user's last name
 *            example: smith
 *          firstName:
 *            type: string
 *            description: user's first name
 *            example: jonh
 *          address:
 *            type: string
 *            description: user's address
 *            example: 3 rue des lilas
 *          roleId:
 *            type: integer
 *            description: user's role's ID
 *            example: 3
 *      User:
 *        allOf:
 *          - $ref: '#/components/schemas/User'
 *          - id:
 *              type: integer
 *              description: The user ID.
 *              example: 0
 *      Order:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The order ID.
 *            example: 0
 *          userId:
 *            type: integer
 *            description: The user ID.
 *            example: 1
 *          storeId:
 *            type: string
 *            description: The store ID.
 *            example: 2
 *          deliveryManId:
 *            type: string
 *            description: The delivery man ID.
 *            example: 3
 *          deliverTime:
 *            type: date-time
 *            description: The delivery man ID.
 *            example: YYYY-MM-DDThh:mm:ss.sTZD
 *          interactionType:
 *            type: string
 *            description: Type of interaction wanted by the user with the delivery man
 *            example: from far away, like, with a stick or something
 *          specialInstructions:
 *            type: string
 *            description: Special insctruction destinated to the delivery man
 *            example: come in moonwalk
 *          price:
 *            type: double
 *            description: order's prices
 *            example: 420.69
 *          articles:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  description: articles id
 *                  example: 2
 *                quantity:
 *                  type: integer
 *                  description: articles quantity
 *                  example: 3
 *
 * /users/:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve the complete list of tags descripting the stores for search purpose
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', userController.findAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve a single user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/:id', userController.findUser);

/**
 * @swagger
 * /users/{id}/orders:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve a single user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: list of users
 *         content:
 *           application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Order'
 */
router.get('/:id/orders', userController.getOrders);

/**
 * @swagger
 * /users/:
 *   post:
 *     summary: create a new user with all the information on it
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/', convertImage, userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: update a user's information with the part given in the body
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.patch('/:id', userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: delete a single user
 *     description: delete a single user base on it's ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: sucess message.
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
