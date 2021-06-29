const express = require('express');
const logController = require('../controllers/logs.controller');
const router = express.Router();

/* GET log listing. */
router.get('/', logController.findAll);

module.exports = router;
