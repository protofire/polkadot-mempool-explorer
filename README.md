# Polkadot Mempool Explorer

Mempool Explorer allow users to monitor pending transactions on [Polkadot](https://polkadot.network/). 

## Environment setup

 - Install [Node.js](https://nodejs.org/)
   - Recommended method is by using [NVM](https://github.com/creationix/nvm)
   - Recommended Node.js version is v12
 - Install [Docker](https://docs.docker.com/get-docker/)

## Demo

[mempool.dot.protofire.io](https://mempool.dot.protofire.io)

## Custom Polkadot Node

In order to track extrinsics lifecycle. We added a new RPC method ([author_trackExtrinsic](https://github.com/protofire/polkadot-mempool-explorer/blob/develop/api/services/polkadot/custom-rpc-methods.js)) on [Substrate core](https://github.com/jarcodallo/substrate/blob/master/client/rpc-api/src/author/mod.rs).

This basically allows someone to subscribe and track status changes in the extrinsics lifecycle, for example movements getting in or out of queues, and everything that matters for us before including those extrinsics in blocks.
  
 - Substrate change: [github.com/paritytech/substrate](https://github.com/jarcodallo/substrate/commits/master)
 - Polkadot dependencies update: [github.com/paritytech/polkadot](https://github.com/jarcodallo/polkadot/commits/master)
 - Docker image of the polkadot binary: [hub.docker.com/polkadot](https://hub.docker.com/repository/docker/jarcodallo/polkadot)

## Get Started

In the project directory, you can run:

### `npm start:dev`

Runs the docker containers in the development mode.\
Open [localhost:8084](http://localhost:8084) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm down`

Stops containers and removes containers, networks, volumes, and images created by `npm start:dev`

### `npm restart`

Restarts `api` and `web` services.

### `npm logs`

Displays log output from all services.

### `npm web:rebuild`

Removes `web` container and build it again

### `npm api:rebuild`

Removes `api` container and build it again

### `npm api:restart`

Restarts `api` service.

### `npm web:restart`

Restarts `web` service.

### `npm api:logs`

Displays log output from `api` service.

### `npm web:logs`

Displays log output from `web` service.

### `npm polkadot-local:logs`

Displays log output from custom `polkadot-local` service.

### `npm polkadot-westend:logs`

Displays log output from custom `polkadot-westend` service.

### `npm polkadot-main:logs`

Displays log output from custom `polkadot-main` service.

## Contributing

### Code of Conduct

[Code of Conduct](CODE_OF_CONDUCT.md)

## License

Mempool Explorer is [Apache 2.0 licensed](LICENSE).
