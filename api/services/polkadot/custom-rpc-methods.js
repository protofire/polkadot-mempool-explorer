const TRACK_EXTRINSIC_METHOD = 'author_trackExtrinsic';
const customMethods = {
  [TRACK_EXTRINSIC_METHOD]: {
    rpc: {
      author: {
        trackExtrinsic: {
          description: 'Subscribe to watch an extrinsic until unsubscribed',
          type: 'ExtrinsicStatus',
          pubsub: ['extrinsicUpdate2', 'trackExtrinsic', 'untrackExtrinsic'],
          params: [
            {
              name: 'hash',
              type: 'Hash',
            },
          ],
        },
      },
    },
  },
};
const customMethodKeys = Object.keys(customMethods);

/**
 * Expose Custom RPC Methods
 */
module.exports = {
  TRACK_EXTRINSIC_METHOD,
  customMethods,
  customMethodKeys,
};
