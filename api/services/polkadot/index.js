/**
 * Module dependencies
 */
const { ApiPromise, WsProvider } = require('@polkadot/api');
const { PRODUCTION } = require('../../env');
const {
  LIVE_NETWORKS,
  TEST_NETWORKS,
  LOCAL_NETWORKS,
  DEV_NETWORKS,
} = require('../../constants/networks');
const logger = require('../../logger');
const {
  customMethods,
  customMethodKeys,
} = require('./custom-rpc-methods');
const CacheService = require('../cache');

const connections = {};
const extrinsicWatchers = {};

class PolkadotService {
  static getNetworks() {
    const local = LOCAL_NETWORKS;

    if (!PRODUCTION) {
      local.push(...DEV_NETWORKS);
    }

    return {
      live: LIVE_NETWORKS,
      test: TEST_NETWORKS,
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

  /**
   * Connect to Polkadot via WebSocket
   * @param {string} networkId
   */
  static async connect(networkId) {
    const { url: endpoint } = PolkadotService.getNetwork(networkId || '');

    // Store all connection in memory.
    if (!connections[networkId]) {
      const provider = new WsProvider(endpoint);
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

      connections[networkId] = api;

      await PolkadotService.setTokenSymbol(networkId, api);
    }

    return connections[networkId];
  }

  /**
   * Watch pending extrinsic until they are finalized.
   * @param {string} networkId
   */
  static async watchPendingExtrinsics(networkId) {
    if (!extrinsicWatchers[networkId]) {
      logger.info(`Init watcher extrinsics for network: ${networkId}`);

      const api = await PolkadotService.connect(networkId);
      const tokenSymbol = await CacheService.getTokenSymbol(networkId);

      const unsub = setInterval(async () => {
        await api.rpc.author.pendingExtrinsics(async (extrinsics) => {
          if (extrinsics.length > 0) {
            const rows = [];
            const timestamp = await api.query.timestamp.now();

            logger.info(`${extrinsics.length} pending extrinsics in the pool.`);

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
              PolkadotService.trackExtrinsic(api, hash, from, nonce, networkId);

              extrinsic.args.forEach((arg) => {
                switch (arg.toRawType()) {
                  case 'AccountId':
                    to = arg.toHuman();
                    break;
                  case 'Compact<Balance>':
                    [value, symbol] = arg.toHuman().split(' ');
                    break;
                  default:
                    break;
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
                createAt: timestamp,
                updateAt: timestamp,
              });
            });

            try {
              // Save extrinsics
              await Promise.all(rows.map((row) => CacheService.upsertExtrinsic(row)));
            } catch (err) {
              logger.error({ err }, 'Error trying to store extrinsis');
            }
          } else {
            logger.debug('No pending extrinsics in the pool.');
          }
        });
      }, 2000);

      extrinsicWatchers[networkId] = unsub;
    }
  }

  static async trackExtrinsic(api, hash, from, nonce, networkId) {
    if (typeof api.rpc.author.trackExtrinsic === 'function') {
      const extrinsic = await CacheService.getExtrinsic(hash, from, nonce, networkId);
      const IsTracked = extrinsic ? extrinsic.tracked : false;

      if (!IsTracked) {
        await CacheService.upsertExtrinsic({
          hash, from, nonce, networkId, tracked: true,
        });

        const unsub = await api.rpc.author.trackExtrinsic(hash, async (extrinsicStatus) => {
          const {
            isInBlock, isFinalityTimeout, isFinalized, isDropped, isInvalid,
          } = extrinsicStatus;
          const data = {
            hash,
            from,
            nonce,
            networkId,
            finalized: isFinalized,
            success: !isInvalid, // The transaction is valid in the current state.
            dropped: isDropped, // The transaction has been dropped from the pool,
          };

          // The transaction has been included in block
          if (isInBlock) {
            const { number: inBlockNumber } = await api.rpc.chain.getHeader(extrinsicStatus.asInBlock);

            data.block = {
              number: inBlockNumber.toString(),
              hash: extrinsicStatus.asInBlock.toString(),
            };
          }

          // The transaction has been finalized
          if (isFinalized) {
            const { number: finalizedNumber } = await api.rpc.chain.getHeader(extrinsicStatus.asFinalized);

            data.block = {
              number: finalizedNumber.toString(),
              hash: extrinsicStatus.asFinalized.toString(),
            };

            unsub();
          }

          // Maximum number of finality has been reached, subscribe again.
          if (isFinalityTimeout) {
            const { number: finalityTimeoutNumber } = await api.rpc.chain.getHeader(extrinsicStatus.asFinalityTimeout);

            data.block = {
              number: finalityTimeoutNumber.toString(),
              hash: extrinsicStatus.asFinalityTimeout.toString(),
            };

            unsub();

            // Start to track transaction life cycle again.
            PolkadotService.trackExtrinsic(api, hash, from, nonce, networkId);
          }

          data.updateAt = await api.query.timestamp.now();

          // Update extrinsic state
          CacheService.upsertExtrinsic(data);
        });
      }
    }
  }

  static async resetWatchPendingExtrinsics(networkId) {
    if (extrinsicWatchers[networkId]) {
      // un subscribe from watchPendingExtrinsics
      extrinsicWatchers[networkId]();
    }

    await PolkadotService.watchPendingExtrinsics(networkId);
  }

  static async watchNewHeads() {
    // TODO: LISTEN TO BLOCK EVENTS
    // await api.rpc.chain.subscribeNewHeads(async (header) => {
    //   const rows = {};
    //   const blockHash = await api.rpc.chain.getBlockHash(header.number);
    //   const { block } = await api.rpc.chain.getBlock(blockHash);
    //   const timestamp = await api.query.timestamp.now();
    //   const pendingExtrinsics = await CacheService.getPendingExtrinsics(networkId);
    //   const blockEvents = await api.query.system.events.at(header.hash);
    //   const pendingExtrinsicHashs = pendingExtrinsics.map(pendingExtrinsic => pendingExtrinsic.hash);

    //   console.log(`Block number: `, header.number.toString());
    //   console.log(`Block hash: `, blockHash.toString());
    //   // console.log(events, pendingExtrinsicHashs);

    //   // map between the extrinsics and events
    //   block.extrinsics.forEach((extrinsic, index) => {
    //     if (!systemSection.includes(extrinsic.method.sectionName)) {
    //       const hash = extrinsic.hash.toString();
    //       // filter the specific events based on the phase and then the
    //       // index of our extrinsic in the block
    //       const extrinsicEvents = blockEvents
    //         .filter(({ phase }) =>
    //           phase.isApplyExtrinsic &&
    //           phase.asApplyExtrinsic.eq(index)
    //         );

    //       // console.log('extrinsic =======>', extrinsic.toHuman(true));
    //       console.log('extrinsic events size =======>', extrinsicEvents.length);
    //       console.log('extrinsic block size =======>', blockEvents.length);
    //       // console.log('extrinsic events =======>', extrinsicEvents);

    //       extrinsicEvents.forEach((extrinsicEvent) => {
    //         // Extract the phase, event and the event types
    //         const { event, phase } = extrinsicEvent;
    //         const types = event.typeDef;
    //         console.log('phase =======>', phase.toHuman());
    //         console.log('event =======>', event.toHuman(true));

    //         // Show what we are busy with
    //         // console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
    //         // console.log(`\t\t${event.meta.documentation.toString()}`);

    //         // Loop through each of the parameters, displaying the type and data
    //         // event.data.forEach((data, index) => {
    //         //   console.log('data =======>', data.toHuman(true));
    //         //   // console.log(`DATA ========> ${types[index].type}:`, data.toHuman());
    //         // });
    //       });

    //       // if (pendingExtrinsicHashs.includes(hash)) {

    //       // }

    //       console.log('extrinsic hash =======>', hash);
    //       // console.log('extrinsic tx hash =====>', extrinsic.hash.toString());
    //       // console.log('extrinsic from =====>', extrinsic.signer.toString());

    //       // let to;
    //       // let balance;

    //       // extrinsic.args.forEach((arg) => {
    //       //   switch (arg.toRawType()) {
    //       //     case 'AccountId':
    //       //       to = arg.toString();
    //       //       break;
    //       //     case 'Compact<Balance>':
    //       //       balance = parseFloat(arg.toString());
    //       //       break;
    //       //     default:
    //       //       break;
    //       //   }
    //       // });

    //       // console.log('extrinsic to =====>', to);
    //       // console.log('extrinsic balance =====>', balance);
    //     }
    //   });
    // });
  }
}

/**
 * Expose PolkadotService
 */
module.exports = PolkadotService;
