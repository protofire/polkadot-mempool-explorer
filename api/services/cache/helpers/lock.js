/**
 * Module dependencies
 */
const { EventEmitter } = require('events');
const logger = require('../../../logger');

/**
 * Expose Local Lock
 */
module.exports = () => {
  const locked = {};
  const eventEmitter = new EventEmitter();
  eventEmitter.setMaxListeners(0);

  return {
    acquire: (key) =>
      // eslint-disable-next-line consistent-return
      new Promise((resolve) => {
        // If nobody has the lock, take it and resolve immediately
        if (!locked[key]) {
          logger.debug('lock acquire key: %s', key);

          locked[key] = true;

          return resolve();
        }

        // Wait until somebody releases the lock and try again
        // eslint-disable-next-line consistent-return
        const tryAcquire = (value) => {
          if (!locked[key]) {
            locked[key] = true;
            eventEmitter.removeListener(key, tryAcquire);

            return resolve(value);
          }
        };

        eventEmitter.on(key, tryAcquire);
      }),
    // If we pass a value, on release this value
    // will be propagated to all the code that's waiting for
    // the lock to release
    release: (key, value) => {
      logger.debug('lock release key: %s', key);

      // Release the lock immediately
      Reflect.deleteProperty(locked, key);
      setImmediate(() => eventEmitter.emit(key, value));
    },
  };
};
