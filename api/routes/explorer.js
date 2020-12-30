/**
 * Module dependencies
 */
const express = require('express');
const moment = require('moment');
const PolkadotService = require('../services/polkadot');
const CacheService = require('../services/cache');
const logger = require('../logger');
const { InternalServerErrorResponse } = require('../http-errors');
const { DATE_FORMAT } = require('../env');

const router = express.Router();
const internalServer = new InternalServerErrorResponse();

/**
 * Get Networks
 */
router.get('/networks', (req, res) => {
  try {
    const networks = PolkadotService.getNetworks();

    res.send(networks);
  } catch (err) {
    logger.error({ err }, 'Error getting networks');

    res.send(internalServer.code, internalServer);
  }
});

router.get('/networks/:networkId/reset', async (req, res) => {
  try {
    await PolkadotService.resetWatchPendingExtrinsics(req.params.networkId || '');

    res.status(204).send();
  } catch (err) {
    logger.error({ err }, 'Error resetting netwotk');

    res.send(internalServer.code, internalServer);
  }
});

router.get('/transactions/:networkId', async (req, res) => {
  try {
    const networkId = req.params.networkId || '';
    await PolkadotService.watchPendingExtrinsics(networkId);

    const extrinsics = await CacheService.getExtrinsics(networkId);
    const response = extrinsics.map((extrinsic) => ({
      hash: extrinsic.hash,
      update_at: moment(extrinsic.updateAt).format(DATE_FORMAT),
      create_at: moment(extrinsic.createAt).format(DATE_FORMAT),
      block_number: extrinsic.block.number,
      type: 'Transaction',
      nonce: extrinsic.nonce,
      tip: extrinsic.tip,
      balance_transfer: extrinsic.value,
      isValid: extrinsic.success,
      from: extrinsic.from,
      to: extrinsic.to,
    }));

    res.send({
      items: response,
      _total: extrinsics.length,
    });
  } catch (err) {
    logger.error({ err }, 'Error getting transactions');

    res.send(internalServer.code, internalServer);
  }
});

/**
 * Expose Router
 */
module.exports = router;
