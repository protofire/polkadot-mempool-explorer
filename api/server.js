/**
 * Module dependencies
 */
const http = require('http');
const express = require('express');
const pinoHttp = require('pino-http');
const { API_BASE_PATH, PORT } = require('./env');
const routes = require('./routes');
const logger = require('./logger');

const app = express();
const appLogger = pinoHttp({ logger });

app.use(appLogger);
app.use(API_BASE_PATH, routes);

/**
 * Run express app as http server on a single process
 */
http.createServer(app).listen(PORT, () => {
  logger.info(`App listening on port http://localhost:${PORT}/`);
});
