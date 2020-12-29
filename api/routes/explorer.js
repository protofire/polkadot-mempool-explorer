/**
 * Module dependencies
 */
const express = require('express');
const PolkadotService = require('../services/polkadot');
const CacheService = require('../services/cache');
const logger = require('../logger');

const router = express.Router();

/**
 * Get Networks
 */
router.get('/networks', (req, res) => {
  const networks = PolkadotService.getNetworks();

  res.send(networks);
});

router.get('/transactions/:networkId', async (req, res) => {
  try {
    const networkId = req.params.networkId || '';
    const extrinsics = await CacheService.getExtrinsics(networkId);

    res.send({ extrinsics });
  } catch (err) {
    logger.error(err);
    res.status(500).send({
      code: '500',
      error: 'Internal Server Error',
      message: err.message,
    });
  }
});

/**
 * Expose Router
 */
module.exports = router;
