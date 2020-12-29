const DEFAULT_NETWORK = {
  id: 'polkadot',
  name: 'Polkadot',
  url: 'wss://cc1-1.polkadot.network',
};

const LIVE_NETWORKS = {
  polkadot: DEFAULT_NETWORK,
  kusama: {
    id: 'kusama',
    name: 'Kusama',
    url: 'wss://cc3-5.kusama.network',
  },
};

const TEST_NETWORKS = {
  amber: {
    id: 'amber',
    name: 'Amber',
    url: 'wss://fullnode.amber.centrifuge.io',
  },
  westend: {
    id: 'westend',
    name: 'Westend',
    url: 'wss://westend-rpc.polkadot.io',
  },
};

const LOCAL_NETWORKS = {
  local: {
    id: 'local',
    name: 'Local',
    url: 'ws://127.0.0.1:9944',
  },
};

/**
 * Expose Networks
 */
module.exports = {
  DEFAULT_NETWORK,
  LIVE_NETWORKS,
  TEST_NETWORKS,
  LOCAL_NETWORKS,
};
