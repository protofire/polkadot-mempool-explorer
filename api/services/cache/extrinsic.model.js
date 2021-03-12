/**
 * Module dependencies
 */

const isBoolean = (val) => typeof val === 'boolean';

/**
 * @class
 */
class ExtrinsicModel {
  constructor() {
    this.section = '';
    this.method = '';
    this.events = [];
    this.transactionVersion = '';
    this.specVersion = '';
    this.hash = '';
    this.from = '';
    this.to = '';
    this.isSigned = false;
    this.nonce = 0;
    this.tip = 0.0;
    this.signature = null;
    this.value = 0.0;
    this.finalized = false;
    this.success = false;
    this.tracked = false;
    this.dropped = false;
    this.createAt = 0; // timestamp
    this.updateAt = 0; // timestamp
    this.tokenSymbol = 'DOT';
    this.era = {
      isMortal: false,
      period: null,
      phase: null,
    };
    this.block = {
      number: 0,
      hash: '',
    };
  }

  buildFrom({
    section,
    method,
    events,
    transactionVersion,
    specVersion,
    hash,
    from,
    to,
    isSigned,
    nonce,
    tip,
    signature,
    value,
    finalized,
    success,
    tracked,
    dropped,
    createAt,
    updateAt,
    tokenSymbol,
    era,
    block,
  } = {}) {
    this.section = section || this.section;
    this.method = method || this.method;
    this.events = events || this.events;
    this.transactionVersion = transactionVersion || this.transactionVersion;
    this.specVersion = specVersion || this.specVersion;
    this.hash = hash || this.hash;
    this.from = from || this.from;
    this.to = to || this.to;
    this.isSigned = isBoolean(isSigned) ? isSigned : this.isSigned;
    this.nonce = nonce || this.nonce;
    this.tip = tip || this.tip;
    this.signature = signature || this.signature;
    this.value = value || this.value;
    this.finalized = isBoolean(finalized) ? finalized : this.finalized;
    this.success = isBoolean(success) ? success : this.success;
    this.tracked = isBoolean(tracked) ? tracked : this.tracked;
    this.dropped = isBoolean(dropped) ? dropped : this.dropped;
    this.createAt = createAt || this.createAt;
    this.updateAt = updateAt || this.updateAt;
    this.tokenSymbol = tokenSymbol || this.tokenSymbol;
    this.era = { ...this.era, ...(era || {}) };
    this.block = { ...this.block, ...(block || {}) };
  }

  /**
   * Returns an immutable object
   */
  toJSON() {
    return Object.freeze({
      block: this.block,
      section: this.section,
      method: this.method,
      events: this.events,
      transactionVersion: this.transactionVersion,
      specVersion: this.specVersion,
      hash: this.hash,
      from: this.from,
      to: this.to,
      isSigned: this.isSigned,
      nonce: this.nonce,
      tip: this.tip,
      signature: this.signature,
      value: this.value,
      finalized: this.finalized,
      success: this.success,
      tracked: this.tracked,
      dropped: this.dropped,
      createAt: this.createAt,
      updateAt: this.updateAt,
      tokenSymbol: this.tokenSymbol,
      era: this.era,
    });
  }
}

/**
 * Expose ExtrinsicModel
 */
module.exports = ExtrinsicModel;
