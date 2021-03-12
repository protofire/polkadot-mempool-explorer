/**
 * Module dependencies
 */
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { DEVELOPMENT, FETCH_PENDING_EXTRINSICS_DELAY } = require('../../env');
const {
  LIVE_NETWORKS,
  TEST_NETWORKS,
  LOCAL_NETWORKS,
  DEV_NETWORKS,
  CUSTOM_NETWORKS,
} = require('../../constants/networks');
const logger = require('../../logger');
const { customMethods, customMethodKeys } = require('./custom-rpc-methods');
const CacheService = require('../cache');

const connections = {};
const extrinsicWatchers = {};
const newHeadWatchers = {};

class PolkadotService {
  static getNetworks() {
    const local = [...LOCAL_NETWORKS];
    let live = [...LIVE_NETWORKS, ...CUSTOM_NETWORKS];

    if (DEVELOPMENT) {
      local.push(...DEV_NETWORKS);
      live = LIVE_NETWORKS;
    }

    return {
      test: TEST_NETWORKS,
      live,
      local,
    };
  }

  static getNetwork(networkId) {
    const { live, test, local } = PolkadotService.getNetworks();
    const networks = [...live, ...test, ...local];
    const network = networks.find((item) => item.id === networkId);

    if (!network) {
      throw new Error('You must provide a valid networkId');
    }

    return network;
  }

  static async setTokenSymbol(networkId, api) {
    const { tokenSymbol } = await api.rpc.system.properties();

    await CacheService.setTokenSymbol(networkId, tokenSymbol.toString());
  }

  static async initWatchers() {
    const { test, live, local } = PolkadotService.getNetworks();
    const promises = [...test, ...live, ...local].map((network) =>
      PolkadotService.watchPendingExtrinsics(network.id)
    );

    return Promise.all(promises);
  }

  /**
   * Connect to Polkadot via WebSocket
   * @param {string} networkId
   */
  static async connect(networkId) {
    const { url: endpoint } = PolkadotService.getNetwork(networkId || '');

    // Store all connection in memory.
    if (!connections[networkId]) {
      try {
        const provider = new WsProvider(endpoint, 100);

        // connect manually to websocket
        await provider.connect();

        let options = { provider };
        let api = await ApiPromise.create(options);
        const { methods } = await api.rpc.rpc.methods();

        customMethodKeys.forEach((methodKey) => {
          if (methods.includes(methodKey)) {
            options = { ...options, ...customMethods[methodKey] };
          }
        });

        // If options contains custom RPC methods.
        if (options.rpc) {
          api = await ApiPromise.create(options);
        }

        connections[networkId] = api.clone();

        await PolkadotService.setTokenSymbol(networkId, api);

        return connections[networkId];
      } catch (error) {
        logger.error({ err: error }, 'Error trying to create Api Provider.');

        return null;
      }
    }

    return connections[networkId];
  }

  /**
   *
   * @param {*} networkId
   */
  static getExtrinsicWatcher(networkId) {
    return extrinsicWatchers[networkId] || null;
  }

  /**
   *
   * @param {*} networkId
   */
  static getNewHeadWatcher(networkId) {
    return newHeadWatchers[networkId] || null;
  }

  /**
   *
   * @param {*} networkId
   */
  static hasTrackExtrinsicMethod(networkId) {
    return (
      connections[networkId] &&
      connections[networkId].rpc.author.trackExtrinsic === 'function'
    );
  }

  /**
   *
   * @param {*} networkId
   */
  static async resetWatchPendingExtrinsics(networkId) {
    const hasTrackExtrinsicMethod = PolkadotService.hasTrackExtrinsicMethod(
      networkId
    );

    PolkadotService.unSubscribeWatchers(networkId);

    if (!hasTrackExtrinsicMethod) {
      await PolkadotService.watchNewHeads(networkId);
    }

    return PolkadotService.watchPendingExtrinsics(networkId);
  }

  static unSubscribeWatchers(networkId) {
    const unsubExtrinsic = PolkadotService.getExtrinsicWatcher(networkId);
    const unsubNewHead = PolkadotService.getNewHeadWatcher(networkId);

    if (unsubExtrinsic) {
      // un subscribe from watchPendingExtrinsics
      clearInterval(unsubExtrinsic);
    }

    if (unsubNewHead) {
      // un subscribe from watchNewHeads
      unsubNewHead();
    }
  }

  /**
   * Watch pending extrinsic until they are finalized.
   * @param {string} networkId
   */
  static async watchPendingExtrinsics(networkId) {
    if (!PolkadotService.getExtrinsicWatcher(networkId)) {
      logger.info(`Init watcher extrinsics for network: ${networkId}`);

      try {
        const api = await PolkadotService.connect(networkId);

        if (api) {
          // Wait until we are ready and connected
          await api.isReady;

          const tokenSymbol = await CacheService.getTokenSymbol(networkId);
          const hasTrackExtrinsicMethod = PolkadotService.hasTrackExtrinsicMethod(
            networkId
          );

          if (!hasTrackExtrinsicMethod) {
            await PolkadotService.watchNewHeads(networkId);
          }

          const unsub = setInterval(async () => {
            await api.rpc.author.pendingExtrinsics(async (extrinsics) => {
              if (extrinsics.length > 0) {
                const rows = [];

                logger.info(
                  `${extrinsics.length} pending extrinsics in network ${networkId}.`
                );

                extrinsics.forEach((extrinsic) => {
                  const hash = extrinsic.hash.toString();
                  const from = extrinsic.signer.toString();
                  const nonce = parseInt(extrinsic.nonce.toString(), 10);
                  const tip = parseFloat(extrinsic.tip.toString());
                  let to = null;
                  let value = 0;
                  let symbol = tokenSymbol;
                  let era = { isMortal: false };

                  // Start to track transaction life cycle
                  if (hasTrackExtrinsicMethod) {
                    PolkadotService.trackExtrinsic(
                      networkId,
                      hash,
                      from,
                      nonce
                    );
                  }

                  extrinsic.args.forEach((arg) => {
                    if (arg.toRawType().includes('AccountId')) {
                      to = arg.toString();
                    } else if (arg.toRawType().includes('Compact<Balance>')) {
                      [value, symbol] = arg.toHuman().split(' ');
                    }
                  });

                  if (extrinsic.era.isMortalEra) {
                    const { period, phase } = extrinsic.era.asMortalEra;
                    era = {
                      isMortal: true,
                      period: period.toString(),
                      phase: phase.toString(),
                    };
                  }

                  rows.push({
                    networkId,
                    hash,
                    from,
                    to,
                    value,
                    era,
                    nonce,
                    tip,
                    tokenSymbol: symbol,
                    section: extrinsic.method.sectionName,
                    method: extrinsic.method.methodName,
                    transactionVersion: extrinsic.type,
                    specVersion: extrinsic.version,
                    isSigned: extrinsic.isSigned,
                    signature: extrinsic.signature.toString(),
                    createAt: Date.now(),
                    updateAt: Date.now(),
                  });
                });

                try {
                  // Save extrinsics
                  await Promise.all(
                    rows.map((row) => CacheService.upsertExtrinsic(row))
                  );
                } catch (err) {
                  logger.error({ err }, 'Error trying to store extrinsis');
                }
              } else {
                logger.debug(
                  `No pending extrinsics in the pool in network ${networkId}.`
                );
              }
            });
          }, FETCH_PENDING_EXTRINSICS_DELAY);

          extrinsicWatchers[networkId] = unsub;
        }
      } catch (error) {
        logger.error({ err: error }, 'Error on watchPendingExtrinsics.');
      }
    }
  }

  /**
   *
   * @param {*} networkId
   * @param {*} hash
   * @param {*} from
   * @param {*} nonce
   */
  static async trackExtrinsic(networkId, hash, from, nonce) {
    const api = await PolkadotService.connect(networkId);
    const extrinsic = await CacheService.getExtrinsic(
      hash,
      from,
      nonce,
      networkId
    );
    const IsTracked = extrinsic ? extrinsic.tracked : false;

    if (!IsTracked) {
      await CacheService.upsertExtrinsic({
        hash,
        from,
        nonce,
        networkId,
        tracked: true,
      });

      const unsub = await api.rpc.author.trackExtrinsic(
        hash,
        async (extrinsicStatus) => {
          const {
            isInBlock,
            isFinalityTimeout,
            isFinalized,
            isDropped,
            isInvalid,
          } = extrinsicStatus;
          const data = {
            hash,
            from,
            nonce,
            networkId,
            block: {},
            finalized: isFinalized,
            success: !isInvalid, // The transaction is valid in the current state.
            dropped: isDropped, // The transaction has been dropped from the pool,
          };

          // The transaction has been included in block
          if (isInBlock) {
            // eslint-disable-next-line max-len
            const { number: inBlockNumber } = await api.rpc.chain.getHeader(
              extrinsicStatus.asInBlock
            );

            data.block = {
              number: inBlockNumber.toString(),
              hash: extrinsicStatus.asInBlock.toString(),
            };
          }

          // The transaction has been finalized
          if (isFinalized) {
            // eslint-disable-next-line max-len
            const { number: finalizedNumber } = await api.rpc.chain.getHeader(
              extrinsicStatus.asFinalized
            );

            data.block = {
              number: finalizedNumber.toString(),
              hash: extrinsicStatus.asFinalized.toString(),
            };

            unsub();
          }

          // Maximum number of finality has been reached, subscribe again.
          if (isFinalityTimeout) {
            // eslint-disable-next-line max-len
            const {
              number: finalityTimeoutNumber,
            } = await api.rpc.chain.getHeader(
              extrinsicStatus.asFinalityTimeout
            );

            data.block = {
              number: finalityTimeoutNumber.toString(),
              hash: extrinsicStatus.asFinalityTimeout.toString(),
            };

            unsub();

            // Start to track transaction life cycle again.
            PolkadotService.trackExtrinsic(api, hash, from, nonce, networkId);
          }

          data.updateAt = Date.now();

          // Update extrinsic state
          CacheService.upsertExtrinsic(data);
        }
      );
    }
  }

  /**
   *
   * @param {*} networkId
   * @param {*} hash
   * @param {*} from
   * @param {*} nonce
   */
  static async watchNewHeads(networkId) {
    if (!PolkadotService.getNewHeadWatcher(networkId)) {
      logger.info(`Init watcher heads for network: ${networkId}`);

      try {
        const api = await PolkadotService.connect(networkId);

        if (api) {
          // Wait until we are ready and connected
          await api.isReady;

          const unsub = await api.rpc.chain.subscribeNewHeads(
            async (header) => {
              const pendingExtrinsicHashes = await CacheService.getPendingExtrinsicHashes(
                networkId
              );
              const blockHash = await api.rpc.chain.getBlockHash(header.number);
              const { block } = await api.rpc.chain.getBlock(blockHash);
              const blockEvents = await api.query.system.events.at(header.hash);
              const rows = [];

              // map between the extrinsics and events
              block.extrinsics.forEach((extrinsic, index) => {
                const hash = extrinsic.hash.toString();

                if (pendingExtrinsicHashes.includes(hash)) {
                  const data = {
                    hash,
                    networkId,
                    from: extrinsic.signer.toString(),
                    nonce: parseInt(extrinsic.nonce.toString(), 10),
                    block: {
                      number: header.number.toString(),
                      hash: blockHash.toString(),
                    },
                    events: [],
                    updateAt: Date.now(),
                  };

                  // filter the specific events based on the phase and then the
                  // index of our extrinsic in the block
                  data.events = blockEvents
                    .filter(
                      ({ phase }) =>
                        phase.isApplyExtrinsic &&
                        phase.asApplyExtrinsic.eq(index)
                    )
                    .map(({ event }) => {
                      if (api.events.system.ExtrinsicSuccess.is(event)) {
                        data.success = true;
                        data.finalized = true;
                      } else if (api.events.system.ExtrinsicFailed.is(event)) {
                        data.success = false;
                        data.finalized = true;
                      }

                      return {
                        method: event.section.toString(),
                        section: event.method.toString(),
                        data: event.data.toHuman(),
                      };
                    });

                  rows.push(data);
                }
              });

              try {
                // Update extrinsics
                await Promise.all(
                  rows.map((row) => CacheService.upsertExtrinsic(row))
                );
              } catch (err) {
                logger.error({ err }, 'Error trying to update extrinsis');
              }
            }
          );

          newHeadWatchers[networkId] = unsub;
        }
      } catch (error) {
        logger.error({ err: error }, 'Error on watchNewHeads.');
      }
    }
  }
}

/**
 * Expose PolkadotService
 */
module.exports = PolkadotService;
