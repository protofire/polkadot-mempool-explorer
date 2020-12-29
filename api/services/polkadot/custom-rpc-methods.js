const customMethods = {
  author_trackExtrinsic: {
    rpc: {
      author: {
        trackExtrinsic: {
          description: 'Subscribe to watch an extrinsic until unsubscribed',
          type: 'ExtrinsicStatus',
          pubsub: [
            'extrinsicUpdate2',
            'trackExtrinsic',
            'untrackExtrinsic'
          ],
          params: [
            {
              name: 'hash',
              type: 'Hash',
            },
          ],
        },
      },
    }  
  }
};
const customMethodKeys = Object.keys(customMethods);

/**
 * Expose Custom RPC Methods
 */
module.exports = {
  customMethods,
  customMethodKeys
};
