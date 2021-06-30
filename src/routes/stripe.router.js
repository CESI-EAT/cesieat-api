const express = require('express');
const paymentController = require('../controllers/stripe.controller');
const router = express.Router();

/* POST new product with price to stripe api. */
router.post('/', paymentController.createProduct);

/* GET product by id. */
router.get('/:id', paymentController.findProduct);

/* GET product price by id. */
router.get('/:id/price', paymentController.findProductPrice);

module.exports = router;
