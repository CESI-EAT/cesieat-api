const express = require('express');
const orderController = require('../controllers/orders.controller');
const router = express.Router();

/**
 * @swagger
 *  components:
 *    schemas:
 *      NewOrder:
 *        type: object
 *        properties:
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
 *      Order:
 *        typer: object
 *        properties:
 *          allOf:
 *            - id:
 *                type: string
 *                description: The order ID.
 *                example: 60dba968813f8a24b0678e51
 *            - $ref: '#/components/schemas/Order'
 *
 * /orders/:
 *   get:
 *     summary: Retrieve a list of orders
 *     description: The list of all the orders since the existence of the mondo db server itself, it is mostly useless and contains too many orders.
 *     responses:
 *       200:
 *         description: The list of all the orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get('/', orderController.findAll);

/**
 * @swagger
 * /orders/:
 *   post:
 *     summary: create a new order with all the information on it
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewOrder'
 *     responses:
 *       201:
 *         description: A single order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   post:
 *     summary: Retrieve a single order and modify it's status to the next step.
 *     description: retrieve the order with it's ID then "increment" it's status following that order REQUESTED>ACCEPTED>PREPARED>DELIVERY>DELIVERED
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: A single order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/:id/validate', orderController.validateStatus);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Retrieve a single order.
 *     description: Retrieve a single order.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the order to retrieve.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: A single order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get('/:id', orderController.findOrder);

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: update an order's information with the part given in the body
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the order to retrieve.
 *         schema:
 *           type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: A single order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.patch('/:id', orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: delete a single order
 *     description: delete a single order base on it's ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the order to retrieve.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: sucess message.
 */
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
