/**
 * Module dependencies
 */
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');
const express = require('express');
const pinoHttp = require('pino-http');
const routes = require('./routes');
const logger = require('./logger');
const PolkadotService = require('./services/polkadot');

const app = express();
const API_BASE_PATH = process.env.API_BASE_PATH || '/api/v1';
const serverPort = process.env.PORT || 8080;
const appLogger = pinoHttp({ logger });

app.use(appLogger);
app.use(API_BASE_PATH, routes);

/**
 * Run express app as http server on a single process
 */
const start = () => {
  PolkadotService.watchPendingExtrinsics();

  http.createServer(app).listen(serverPort, () => {
    logger.info(`App listening on port http://localhost:${serverPort}/`);
  });
};

/**
 * Run express server with cluster
 */
const initCluster = () => {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork();
    }

    cluster.on('online', (worker) => {
      logger.info(`Worker ${worker.process.pid} is online`);
    });

    cluster.on('exit', (worker) => {
      logger.info(`Worker ${worker.process.pid} died`);
      logger.info('Starting a new worker');
      cluster.fork();
    });
  } else {
    start();
  }
};

if (process.env.NODE_ENV === 'production') {
  initCluster();
} else {
  start();
}
