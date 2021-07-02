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
 *          - type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: The user ID.
 *                example: 0
 *          - $ref: '#/components/schemas/NewUser'
 *
 * /users/:
 *   get:
 *     tags :
 *       - users
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
 *     tags :
 *       - users
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
 *     tags :
 *       - orders
 *       - users
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
 *     tags :
 *       - users
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
 *     tags :
 *       - users
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
 *     tags :
 *       - users
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
