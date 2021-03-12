/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const rewiremock = require('rewiremock/node');
const sinon = require('sinon');
const { resetCache, lru } = require('./mocks/lru-cache.mock');
const loggerMock = require('./mocks/logger.mock');
const pendingExtrinsicsRawData = require('./mocks/pending-extrinsics.json');
const pendingExtrinsicRawData = require('./mocks/pending-extrinsic.json');

describe('CacheService', () => {
  const dotTokenSymbol = 'DOT';
  const networkId = 'test-netwotk-id';
  const defaultHash =
    '0x602cfae136b8b26d2ef5fd492e74a53b7adbdeacf1c636a946e445917c3d9d08';
  const BOB = '5GxDBrTuFgCAN49xrpRFWJiA969R2Ny5NnTa8cSPBh8hWHY9';
  const defaultNonce = 1;
  const pendingExtrinsicsRawDataLength = pendingExtrinsicsRawData.length;
  let CacheService;

  before(() => {
    // Mock the LRU module.
    CacheService = rewiremock.proxy('.', {
      './helpers/lru-cache': () => lru,
      '../../logger': loggerMock,
    });
  });

  beforeEach(() => {
    // set pending extrinsics
    const extrinsicKeys = [];

    pendingExtrinsicsRawData.forEach((extrinsic) => {
      const extrinsicKey = CacheService.getExtrinsicKey(
        networkId,
        extrinsic.hash,
        extrinsic.from,
        extrinsic.nonce
      );
      extrinsicKeys.push(extrinsicKey);

      lru.set(extrinsicKey, JSON.stringify(extrinsic));
    });

    lru.set(
      CacheService.getNetworkKey(networkId),
      JSON.stringify(extrinsicKeys)
    );

    // Init spies
    sinon.spy(lru, 'get');
    sinon.spy(lru, 'set');
    sinon.spy(lru, 'del');
  });

  after(() => {
    rewiremock.disable(); // wipes cache and disables interceptor.
  });

  afterEach(() => {
    resetCache();
    lru.get.restore();
    lru.set.restore();
    lru.del.restore();
  });

  it('should return a valid network key', async () => {
    const networkKey = CacheService.getNetworkKey(networkId);

    expect(networkKey).to.equal(`network.id-${networkId}.key`);
  });

  it('should return a valid token symbol key', async () => {
    const networkKey = CacheService.getNetworkKey(networkId);
    const tokenSymbolKey = CacheService.getTokenSymbolKey(networkId);

    expect(tokenSymbolKey).to.equal(`${networkKey}.token-symbol`);
  });

  it('should return a valid extrinsic key', async () => {
    const networkKey = CacheService.getNetworkKey(networkId);
    const extrinsicKey = CacheService.getExtrinsicKey(
      networkId,
      defaultHash,
      BOB,
      defaultNonce
    );

    expect(extrinsicKey).to.equal(
      `${networkKey}.extrinsic.hash-${defaultHash}.from-${BOB}.nonce-${defaultNonce}.key`
    );
  });

  it('should throw an error if networkId is not provided to getExtrinsicKey method', async () => {
    try {
      CacheService.getExtrinsicKey();
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('should throw an error if hash is not provided to getExtrinsicKey method', async () => {
    try {
      CacheService.getExtrinsicKey(networkId);
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('should throw an error if from is not provided to getExtrinsicKey method', async () => {
    try {
      CacheService.getExtrinsicKey(networkId, defaultHash);
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('should throw an error if nonce is not provided to getExtrinsicKey method', async () => {
    try {
      CacheService.getExtrinsicKey(networkId, defaultHash, BOB);
    } catch (err) {
      expect(err).to.exist;
    }
  });

  it('should return a valid token symbol', async () => {
    // set symbol token in the cache
    lru.set(CacheService.getTokenSymbolKey(networkId), dotTokenSymbol);

    const tokenSymbol = await CacheService.getTokenSymbol(networkId);

    expect(tokenSymbol).to.equal(dotTokenSymbol);
    expect(lru.get.calledOnce).to.be.true;
  });

  it('should set a token symbol in the cache', async () => {
    await CacheService.setTokenSymbol(networkId, dotTokenSymbol);

    const cacheValue = lru.get(CacheService.getTokenSymbolKey(networkId));

    expect(cacheValue).to.equal(dotTokenSymbol);
    expect(lru.set.calledOnce).to.be.true;
  });

  it('should return a valid pending extrinsic hashes', async () => {
    const pendingExtrinsicHashes = await CacheService.getPendingExtrinsicHashes(
      networkId
    );
    const expectedPendingExtrinsics = pendingExtrinsicsRawData.map(
      (extrinsic) => extrinsic.hash
    );

    expect(pendingExtrinsicHashes)
      .to.be.an('array')
      .that.include.members(expectedPendingExtrinsics);
    expect(lru.get.callCount).to.equal(pendingExtrinsicsRawDataLength + 1);
  });

  it('should set an extrinsic keys in the cache', async () => {
    const extrinsicKeys = ['extrinsic-key-1', 'extrinsic-key-2'];

    await CacheService.setNetworkExtrinsicKeys(networkId, extrinsicKeys);

    const cacheValue = JSON.parse(
      lru.get(CacheService.getNetworkKey(networkId))
    );

    expect(cacheValue).to.be.an('array').that.include.members(extrinsicKeys);
    expect(lru.set.calledOnce).to.be.true;
  });

  it('should set an extrinsic in the cache', async () => {
    const { hash, from, nonce } = pendingExtrinsicRawData;
    await CacheService.setExtrinsic(
      hash,
      from,
      nonce,
      networkId,
      pendingExtrinsicRawData
    );

    const cacheValue = JSON.parse(
      lru.get(CacheService.getExtrinsicKey(networkId, hash, from, nonce))
    );

    expect(cacheValue)
      .to.be.an('object')
      .to.deep.equal(pendingExtrinsicRawData);
    expect(lru.set.calledOnce).to.be.true;
  });

  it('should return a valid network extrinsic keys', async () => {
    const networkExtrinsicKeys = await CacheService.getNetworkExtrinsicKeys(
      networkId
    );
    const expectedNetworkExtrinsicKeys = pendingExtrinsicsRawData.map(
      (extrinsic) =>
        CacheService.getExtrinsicKey(
          networkId,
          extrinsic.hash,
          extrinsic.from,
          extrinsic.nonce
        )
    );

    expect(networkExtrinsicKeys)
      .to.be.an('array')
      .that.include.members(expectedNetworkExtrinsicKeys);
    expect(lru.get.calledOnce).to.be.true;
  });

  it('should return a valid extrinsic', async () => {
    const promises = pendingExtrinsicsRawData.map((extrinsic) =>
      CacheService.getExtrinsic(
        extrinsic.hash,
        extrinsic.from,
        extrinsic.nonce,
        networkId
      )
    );
    const cacheValues = await Promise.all(promises);

    expect(cacheValues)
      .to.be.an('array')
      .to.have.deep.members(pendingExtrinsicsRawData);
    expect(lru.get.calledThrice).to.be.true;
  });

  it('should returns a valid extrinsic list by networkId', async () => {
    const orderedExtrinsicsByCreateAt = pendingExtrinsicsRawData.sort(
      (a, b) => {
        if (a.createAt > b.createAt) return -1;
        if (a.createAt < b.createAt) return 1;
        return 0;
      }
    );
    const extrinsics = await CacheService.getExtrinsics(networkId);

    expect(extrinsics)
      .to.be.an('array')
      .to.include.deep.ordered.members(orderedExtrinsicsByCreateAt);
    expect(lru.get.callCount).to.equal(pendingExtrinsicsRawDataLength + 1);
  });

  it('should remove the least-recently-used extrinsic from network', async () => {
    // Add an invalid extrinsic key
    const invalidExtrinsicKeys = [
      'invalid-extrinsic-key-1',
      'invalid-extrinsic-key-2',
    ];

    await CacheService.setNetworkExtrinsicKeys(networkId, invalidExtrinsicKeys);
    const extrinsics = await CacheService.getExtrinsics(networkId);

    expect(extrinsics).to.be.an('array');
    expect(extrinsics).to.be.empty;
    expect(lru.get.callCount).to.equal(invalidExtrinsicKeys.length + 1);
    expect(lru.set.callCount).to.equal(invalidExtrinsicKeys.length);
  });

  it('should returns an empty extrinsic list by networkId', async () => {
    const extrinsics = await CacheService.getExtrinsics(`empty-${networkId}`);

    expect(extrinsics).to.be.an('array');
    expect(extrinsics).to.be.empty;
    expect(lru.get.calledOnce).to.be.true;
  });

  it('should store an extrinsic in the cache', async () => {
    // reset the lru cache before store the pending extrinsics
    resetCache();

    let extrinsics = await CacheService.getExtrinsics(networkId);

    expect(extrinsics).to.be.an('array');
    expect(extrinsics).to.be.empty;

    const promises = pendingExtrinsicsRawData.map((extrinsic) =>
      CacheService.upsertExtrinsic({
        networkId,
        hash: extrinsic.hash,
        from: extrinsic.from,
        to: extrinsic.to,
        value: extrinsic.value,
        era: extrinsic.era,
        nonce: extrinsic.nonce,
        tip: extrinsic.tip,
        tokenSymbol: dotTokenSymbol,
        section: extrinsic.section,
        method: extrinsic.method,
        transactionVersion: extrinsic.transactionVersion,
        specVersion: extrinsic.specVersion,
        isSigned: true,
        signature: extrinsic.signature,
        createAt: Date.now(),
        updateAt: Date.now(),
      })
    );

    await Promise.all(promises);

    extrinsics = await CacheService.getExtrinsics(networkId);

    expect(extrinsics).to.be.an('array');
    expect(extrinsics).to.have.lengthOf(pendingExtrinsicsRawDataLength);
  });
});
