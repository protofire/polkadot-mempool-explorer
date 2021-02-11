const DEFAULT_NETWORK = {
  id: 'polkadot',
  name: 'Polkadot',
  url: 'wss://rpc.polkadot.io',
};

const LIVE_NETWORKS = [
  DEFAULT_NETWORK,
  {
    id: 'kusama',
    name: 'Kusama',
    url: 'wss://kusama-rpc.polkadot.io',
  },
];

const TEST_NETWORKS = [
  {
    id: 'westend2',
    name: 'Westend',
    url: 'wss://westend-rpc.polkadot.io',
  },
  {
    id: 'rococo',
    name: 'Rococo',
    url: 'wss://rococo-rpc.polkadot.io',
  },
  // {
  //   id: 'rococo-tick',
  //   name: 'Rococo Tick',
  //   url: 'wss://tick-rpc.polkadot.io',
  // },
  // {
  //   id: 'rococo-trick',
  //   name: 'Rococo Trick',
  //   url: 'wss://trick-rpc.polkadot.io',
  // },
  // {
  //   id: 'rococo-track',
  //   name: 'Rococo Track',
  //   url: 'wss://track-rpc.polkadot.io',
  // },
];

const LOCAL_NETWORKS = [
  // {
  //   id: 'local',
  //   name: 'Local',
  //   url: 'ws://127.0.0.1:9944',
  // },
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

const CUSTOM_NETWORKS = [
  {
    id: 'polkadot-custom',
    name: 'Polkadot Custom',
    url: 'ws://polkadot-polkadot-custom-node:9944',
  },
  {
    id: 'westend2-custom',
    name: 'Westend Custom',
    url: 'ws://polkadot-westend-custom-node:9944',
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
  CUSTOM_NETWORKS,
};
