/**
 * Module dependencies
 */
const { ApiPromise } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const { cryptoWaitReady } = require('@polkadot/util-crypto') ;

const BOB = '5GxDBrTuFgCAN49xrpRFWJiA969R2Ny5NnTa8cSPBh8hWHY9';

async function main () {    

  await cryptoWaitReady();
  // Instantiate the API
  const api = await ApiPromise.create();

  // Constuct the keying after the API (crypto has an async init)
  const keyring = new Keyring({ type: 'sr25519' });

  // Add alice to our keyring with a hard-deived path (empty phrase, so uses dev)
  const alice = keyring.addFromUri('//Alice');

  // Create a extrinsic, transferring 12345 units to Bob
  const transfer = api.tx.balances.transfer(BOB, 0.003);
  
  // retrieve sender's next index/nonce, taking txs in the pool into account
  const nonce = await api.rpc.system.accountNextIndex(alice.address);

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice, { nonce });

  console.log('Alice address: ', alice.address);
  console.log('Transfer sent with hash', hash.toHex());
}

main().catch(console.error).finally(() => process.exit());