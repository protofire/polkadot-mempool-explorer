/**
 * Module dependencies
 */
const express = require('express');

const router = express.Router();

/**
 * Ping controller
 */
router.get('/ping', (req, res) => {
  res.status(status).send('pong');
});

/**
 * Expose Router
 */
module.exports = router;
