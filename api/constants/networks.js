const DEFAULT_NETWORK = {
  id: 'polkadot',
  name: 'Polkadot',
  url: 'wss://cc1-1.polkadot.network',
};

const LIVE_NETWORKS = [
  DEFAULT_NETWORK,
  {
    id: 'kusama',
    name: 'Kusama',
    url: 'wss://cc3-5.kusama.network',
  },
];

const TEST_NETWORKS = [
  {
    id: 'amber',
    name: 'Amber',
    url: 'wss://fullnode.amber.centrifuge.io',
  },
  {
    id: 'westend2',
    name: 'Westend',
    url: 'wss://westend-rpc.polkadot.io',
  },
];

const LOCAL_NETWORKS = [
  {
    id: 'local',
    name: 'Local',
    url: 'ws://127.0.0.1:9944',
  },
];

const DEV_NETWORKS = [
  {
    id: 'docker-local',
    name: 'Docker Node Local',
    url: 'ws://polkadot_local_node:9944',
  },
  {
    id: 'docker-westend',
    name: 'Docker Node Westend',
    url: 'ws://polkadot_westend_node:9944',
  },
  {
    id: 'docker-polkadot',
    name: 'Docker Node Polkadot',
    url: 'ws://polkadot_main_node:9944',
  },
];

/**
 * Expose Networks
 */
module.exports = {
  DEFAULT_NETWORK,
  LIVE_NETWORKS,
  TEST_NETWORKS,
  LOCAL_NETWORKS,
  DEV_NETWORKS,
};
