const express = require('express');
const storeController = require('../controllers/storeController');
const router = express.Router();

/* GET stores listing. */
router.get('/', storeController.findAll);

/* POST store. */
router.post('/', storeController.createStore);

/* GET store by id. */
router.get('/:id', storeController.findStore);

/* PATCH store by id. */
router.patch('/:id', storeController.updateStore);

/* DELETE store by id. */
router.delete('/:id', storeController.deleteStore);
module.exports = router;
