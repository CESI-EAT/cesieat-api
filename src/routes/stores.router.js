const express = require('express');
const storeController = require('../controllers/stores.controller');
const router = express.Router();
const { convertImage } = require('../middlewares/images.middleware');

/**
 * @swagger
 *  components:
 *    schemas:
 *      NewStore:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: store's name
 *            example: Krusty Krab
 *          address:
 *            type: string
 *            description: store's address
 *            example: 3 rue de la plage
 *          postalCode:
 *            type: integer
 *            description: store's postal code
 *            example: 123456
 *          city:
 *            type: string
 *            description: store's city
 *            example: bikini bottom
 *          openingHours:
 *            type: object
 *            description: list of oppening hour by day
 *            properties:
 *              monday:
 *                type: array
 *                description: time spans of oppening
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: opening or closing time
 *                    example: "13:30"
 *              tuesday:
 *                type: array
 *                description: time spans of oppening
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: opening or closing time
 *                    example: "13:30"
 *              wednesday:
 *                type: array
 *                description: time spans of oppening
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: opening or closing time
 *                    example: "13:30"
 *              thursday:
 *                type: array
 *                description: time spans of oppening
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: opening or closing time
 *                    example: "13:30"
 *              friday:
 *                type: array
 *                description: time spans of oppening
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: opening or closing time
 *                    example: "13:30"
 *              saturday:
 *                type: array
 *                description: time spans of oppening
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: opening or closing time
 *                    example: "13:30"
 *              sunday:
 *                type: array
 *                description: time spans of oppening
 *                items:
 *                  type: array
 *                  items:
 *                    type: string
 *                    description: opening or closing time
 *                    example: "13:30"
 *          priceRange:
 *            type: integer
 *            description: quick view of the price range of the stores between 1 and 4
 *            example: 2
 *          takeaway:
 *            type: boolean
 *            description: true if the store do takeaway
 *            example: false
 *          rating:
 *            type: double
 *            description: user's evaluation of the store
 *            example: 3.7
 *          ratingCount:
 *            type: integer
 *            description: number of rating
 *            example: 69
 *          image:
 *            type: string
 *            description: URL of the picture illustrating the store, hosted on a remote server
 *            example: https://i.ibb.co/QnKH99Z/what-s-4-lunch-1616074.jpg
 *          products:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Product'
 *          tags:
 *            type: array
 *            description: list of tags describing the store, the tags are referenced in the tags collection
 *            items:
 *              type: string
 *              exemple: fast food
 *          categories:
 *            type: array
 *            description: liste of the different categories of product sold by the store
 *            items:
 *              $ref: '#/components/schemas/Categorie'
 *      Product:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: name of the product
 *            example: hamburger
 *          categories:
 *            type: array
 *            description: list of id of categories
 *            items:
 *              type: integer
 *              description: id of categories
 *              example: 2
 *          price:
 *            type:  double
 *            description: product's price
 *            example: 12.32
 *          image:
 *            type: string
 *            description: URL of the picture illustrating the store, hosted on a remote server
 *            example: https://i.ibb.co/QnKH99Z/what-s-4-lunch-1616074.jpg
 *          description:
 *            type: string
 *            description: description of the product
 *            example: a burger with a steak
 *          id:
 *            type: integer
 *            description: product ID
 *            example: 4
 *          active:
 *            type: boolean
 *            description: boolean set as false when a product is removed from the store's menu
 *            example: true
 *      Categorie:
 *        type: object
 *        properties:
 *          name:
 *            type: string
 *            description: name of the categorie
 *            example: burger
 *          active:
 *            type: boolean
 *            description: boolean set as false when a categorie is removed from the store's menu
 *            example: true
 *          id:
 *            type: integer
 *            description: categorie ID
 *            example: 4
 *          order:
 *            type: integer
 *            description: order of display on the store page
 *            example: 2
 *      Store:
 *        allOf:
 *          - type: object
 *            properties:
 *              id:
 *                type: string
 *                description: The store ID.
 *                example: 60dba968813f8a24b0678e51
 *          - $ref: '#/components/schemas/NewStore'
 *
 * /stores/:
 *   get:
 *     tags :
 *       - Stores
 *     summary: Retrieve a list of store
 *     description: The list of all the stores, perfect for a front page
 *     responses:
 *       200:
 *         description: The list of all the stores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Store'
 */
router.get('/', storeController.findAll);

/**
 * @swagger
 * /stores/:
 *   post:
 *     tags :
 *       - Stores
 *     summary: create a new store with the given informations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStore'
 *     responses:
 *       201:
 *         description: A single order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 */
router.post('/', convertImage, storeController.createStore);

/**
 * @swagger
 * /stores/{id}:
 *   get:
 *     tags :
 *       - Stores
 *     summary: Retrieve a single store.
 *     description: Retrieve a single store.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the store to retrieve.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: A single store.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 */
router.get('/:id', storeController.findStore);

/**
 * @swagger
 * /stores/{id}:
 *   patch:
 *     tags :
 *       - Stores
 *     summary: update an store's information with the part given in the body, it is used to update the menu of the store
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the store to patch.
 *         schema:
 *           type: String
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Store'
 *     responses:
 *       200:
 *         description: A single store.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Store'
 */
router.patch('/:id', convertImage, storeController.updateStore);

/**
 * @swagger
 * /stores/{id}:
 *   delete:
 *     tags :
 *       - Stores
 *     summary: delete a single store
 *     description: delete a single store base on it's ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the store to retrieve.
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: sucess message.
 */
router.delete('/:id', storeController.deleteStore);
module.exports = router;
