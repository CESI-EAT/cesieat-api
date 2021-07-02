const express = require('express');
const orderController = require('../controllers/orders.controller');
const router = express.Router();

/* GET order listing. */
router.get('/', orderController.findAll);

/* GET order count by day. */
router.get('/days', orderController.findAllByDay);

/* POST order. */
router.post('/', orderController.createOrder);

/* POST, validate current order status and increment it */
router.post('/:id/validate', orderController.validateStatus);

/* GET order by id. */
router.get('/:id', orderController.findOrder);

/* PATCH order by id. */
router.patch('/:id', orderController.updateOrder);

/* DELETE order by id. */
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
