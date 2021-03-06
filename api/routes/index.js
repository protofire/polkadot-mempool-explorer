/**
 * Module dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const hpp = require('hpp');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const ping = require('./ping');
const explorer = require('./explorer');
const { NotFoundErrorResponse } = require('../http-errors');
const explorerApiDocumentation = require('./explorerApiDocumentation');

const router = express.Router();
const notFound = new NotFoundErrorResponse();

/**
 * Server middlewares
 */
router.use([
  compression(),
  helmet({
    frameguard: false,
    dnsPrefetchControl: {
      allow: true,
    },
  }),
  bodyParser.urlencoded({ limit: '100kb', extended: true }),
  bodyParser.json({ limit: '100kb' }),
  hpp(),
]);

/**
 * Mount routes
 */
router.use('/', ping);
router.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(explorerApiDocumentation)
);
router.use('/mempool-explorer', explorer);
router.use('/*', (_, res) => res.send(notFound.code, notFound));

/**
 * Espose API Router
 */
module.exports = router;
