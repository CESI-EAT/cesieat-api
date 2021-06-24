const express = require('express');
const storeController = require('../controllers/storeController');
const router = express.Router();

/* GET users listing. */
router.get('/', storeController.getAll);

module.exports = router;
