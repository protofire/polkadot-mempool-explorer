/**
 * Module dependencies
 */
const { ApiPromise, WsProvider } = require('@polkadot/api');
const {
  DEFAULT_NETWORK,
  LIVE_NETWORKS,
  TEST_NETWORKS,
  LOCAL_NETWORKS
} = require('../../constants/networks');
const logger = require('../../logger');
const { customMethods, customMethodKeys } = require('./custom-rpc-methods');
const CacheService = require('../cache');

let connections = {};

class PolkadotService {
  static getNetworks() {
    return {
      live: Object.values(LIVE_NETWORKS),
      test: Object.values(TEST_NETWORKS),
      local: Object.values(LOCAL_NETWORKS),
    };
  }
  
  /**
   * Connect to Polkadot WebSocket RPC server
   * @param {string} endpoint 
   */
  static async connect(endpoint) {
    // Store all connection in memory.
    if (!connections[endpoint]) {
      const wsProvider = new WsProvider('ws://polkadot_local_node:9944' || DEFAULT_NETWORK.url);
      let options = { provider: wsProvider };
      let api = await ApiPromise.create(options);
      
      const { methods } = await api.rpc.rpc.methods();
      
      customMethodKeys.forEach((methodKey) => {
        if (methods.includes(methodKey)) {
          options = Object.assign({}, options, customMethods[methodKey]);
        }
      });
      
      // If options contains custom RPC methods.
      if (options.rpc) {
        api = await ApiPromise.create(options);
      }
      
      connections[endpoint] = { api, wsProvider, networkId: 'local' };
    }
    
    return connections[endpoint];
  }
  
  static trackExtrinsic(hash, from, nonce, networkId) {
    
    
    // await api.rpc.author.trackExtrinsic(extrinsics[0].hash, (result) => {
          //   console.log(`Current status is: `, result);
          // });
  }
  
  /**
   * 
   * @param {*} endpoint 
   */
  static async watchPendingExtrinsics(endpoint) {
    const { api, networkId } = await PolkadotService.connect(endpoint);

    setInterval(async () => {
      await api.rpc.author.pendingExtrinsics(async (extrinsics) => {
        if (extrinsics.length > 0) {
          const rows = [];
          const timestamp = await api.query.timestamp.now();

          logger.info(`${extrinsics.length} pending extrinsics in the pool.`);
          
          extrinsics.forEach(extrinsic => {
            const hash = extrinsic.hash.toString();
            const from = extrinsic.signer.toString();
            const nonce = parseInt(extrinsic.nonce.toString(), 10);
            const tip = parseFloat(extrinsic.tip.toString());
            let to = null;
            let value = 0;
            let era = { isMortal: false };

            extrinsic.args.forEach((arg) => {
              switch (arg.toRawType()) {
                case 'AccountId':
                  to = arg.toString();
                  break;
                case 'Compact<Balance>':
                  value = parseFloat(arg.toString());
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
            await Promise.all(rows.map(row => CacheService.upsertExtrinsic(row)));
          } catch (error) {
            console.error(error);
            logger.error('Error trying to store extrinsis', error);
          }
        } else {
          logger.debug('No pending extrinsics in the pool.');
        }
      });
    }, 2000);
    
    // Subscribe to system events via storage
    // api.query.system.events((events) => {
    //   console.log(`\nReceived ${events.length} events:`);

    //   // Loop through the Vec<EventRecord>
    //   events.forEach((record) => {
    //     // Extract the phase, event and the event types
    //     const { event, phase, topics } = record;
        
    //     if (event.section !== 'system') {
    //       const types = event.typeDef;
    //       console.log('phase =======>', phase.toHuman());
    //       console.log('event =======>', event.toHuman(true));  
    //     }
        
        
        
    //     // Show what we are busy with
    //     // console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
    //     // console.log(`\t\t${event.meta.documentation.toString()}`);

    //     // Loop through each of the parameters, displaying the type and data
    //     // event.data.forEach((data, index) => {
    //     //   console.log('data =======>', data.toHuman(true));
    //     //   // console.log(`DATA ========> ${types[index].type}:`, data.toHuman());
    //     // });
    //   });
    // });
    
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