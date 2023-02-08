const apiDoc = {
  openapi: '3.0.3',
  info: {
    title: 'Api for  SlugLoop',
    version: '1.0.0',
    description: 'Api for SlugLoop',
  },
  paths: {
    '/': {
      // Sever description page
      get: {
        description: 'Server description page',
        responses: {
          200: {
            description: 'Server description page',
          },
        },
      },
    },
    '/buses': {
      // Gets all bus location and returns a json array
      get: {
        description: 'Gets all bus location',
        responses: {
          200: {
            description: 'Gets all bus location',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/busesArray',
                },
              },
            },
          },
          500: {
            description: 'Error getting documents',
          },
        },
      },
    },
    '/ping': {
      // Ping the server from base stations
      post: {
        description: 'Ping the server from base stations',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/pingBody',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'OK',
          },
          400: {
            description: 'Invalid data',
          },
        },
      },
    },
    '/contact': {
      // For the contact us form
      post: {
        description: 'For the contact us form',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/messageBody',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Message sent',
          },
          500: {
            description: 'Error sending message',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      busesArray: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            lastPing: {
              type: 'string',
            },
            lastLongitude: {
              type: 'number',
            },
            lastLatitude: {
              type: 'number',
            },
            route: {
              type: 'string',
            },
          },
        },
      },
      messageBody: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          message: {
            type: 'string',
          },
        },
      },
      pingBody: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            example: '[{"id":"1","lon":1,"lat":1,"route":"1"}]',
          },
        },
      },
    },
  },
};

// Export
module.exports = apiDoc;
