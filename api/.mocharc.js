process.env.JUNIT_REPORT_PATH = './tests/report/polkadot_mempool_explorer_api.xml';
process.env.JUNIT_REPORT_NAME = 'Polkadot Mempool Explorer API';
process.env.JUNIT_REPORT_STACK = true;
process.env.JUNIT_REPORT_PACKAGES = true;

module.exports = {
  bail: true,
  exit: true,
  require: ['source-map-support/register'],
  spec: ['tests', './{,!(node_modules)/**/}*.test.js'],
  timeout: 4000,
  ui: 'bdd',
};
