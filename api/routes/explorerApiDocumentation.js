/**
 * Expose OpenAPI Definition
 */
module.exports = {
  openapi: '3.0.1',
  info: {
    title: "Polkadot Mempool Explorer API",
    version: '1.0.3',
    description: 'This is the definition of the `Polkadot Mempool Explorer` API.',
    contact: {
      name: 'Protofire Team',
      email: 'hello@protofire.io',
      url: 'http://protofire.io/',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://github.com/protofire/polkadot-mempool-explorer/blob/main/LICENSE'
    }
  },
  servers: [
    {
      url: 'https://mempool.dot.protofire.io/api/v1/mempool-explorer',
      description: 'Demo server'
    },
  ],
  tags: [
    {
      name: 'Mempool'
    }
  ],
  paths: {
    '/networks': {
      get: {
        tags: ['Mempool'],
        description: 'Get networks',
        operationId: 'getNetworks',
        responses: {
          '200': {
            description: 'Networks were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Networks'
                },
              },
            },
          },
          '500': {
            description: 'The server encountered an unexpected condition.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  code: 500,
                  type: 'Internal Server',
                  message: 'The server encountered an unexpected condition.'
                },
              },
            },
          },
        },
      },
    },
    '/networks/{networkId}/reset': {
      post: {
        tags: ['Mempool'],
        description: 'Reset the listener for a network id.',
        operationId: 'resetNetwork',
        parameters: [
          { $ref: '#/components/schemas/NetworkId' },
        ],
        responses: {
          '204': {
            description: '204 - No Content. The action has been enacted and no further\ninformation is to be supplied\n'
          },
          '500': {
            description: 'The server encountered an unexpected condition.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  code: 500,
                  type: 'Internal Server',
                  message: 'The server encountered an unexpected condition.'
                },
              },
            },
          },
        }
      }
    },
    '/transactions/{networkId}': {
      get: {
        tags: ['Mempool'],
        description: 'Get transactions by network id.',
        operationId: 'getTransactionsByNetworkId',
        parameters: [
          { $ref: '#/components/schemas/NetworkId' },
        ],
        responses: {
          '200': {
            description: 'Transactions were obtained',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Transactions'
                },
              },
            },
          },
          '500': {
            description: 'The server encountered an unexpected condition.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  code: 500,
                  type: 'Internal Server',
                  message: 'The server encountered an unexpected condition.'
                },
              },
            },
          },
        },
      }
    },
  },
  components: {
    schemas: {
      NetworkId: {
        name: 'networkId',
        in: 'path',
        description: 'ID of the network',
        schema: {
          type: 'string',
        },
        required: true
     },
      Network: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          name: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
        },
      },
      Networks: {
        type: 'object',
        properties: {
          test: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Network'
            },
          },
          live: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Network'
            },
          },
          local: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Network'
            },
          },
        },
      },
      Transaction: {
        type: 'object',
        properties: {
          hash: {
            type: 'string',
          },
          update_at: {
            type: 'string',
          },
          create_at: {
            type: 'string',
          },
          block_number: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
          nonce: {
            type: 'number',
          },
          tip: {
            type: 'number',
          },
          balance_transfer: {
            type: 'string',
          },
          isValid: {
            type: 'boolean',
            default: false,
          },
          isFinalized: {
            type: 'boolean',
            default: false,
          },
          from: {
            type: 'string',
          },
          to: {
            type: 'string',
          },
        },
      },
      Transactions: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Transaction'
            },
          },
          _total: {
            type: 'number',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          code: {
            type: 'number'
          },
          type: {
            type: 'string'
          },
          message: {
            type: 'string'
          },
        }
      },
    },
  },
};
