const express = require('express');
const tagController = require('../controllers/tags.controller');
const router = express.Router();

/**
 * @swagger
 * /tags:
 *  get:
 *    tags :
 *      - tags
 *    summary: Retrieve a list of tags
 *    description: Retrieve the complete list of tags descripting the stores for search purpose
 *    responses:
 *       200:
 *         description: list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: tag's id
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: tag's name
 *                         example: italien
 */
router.get('/', tagController.findAll);

module.exports = router;
