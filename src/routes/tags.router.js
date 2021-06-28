const express = require('express');
const tagController = require('../controllers/tagController');
const router = express.Router();

/* GET tag listing. */
router.get('/', tagController.findAll);

module.exports = router;
