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
                  $ref: '#/components/schemas/BusesArray',
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
  },
  components: {
    schemas: {
      BusesArray: {
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
    },
  },
};

// Export
module.exports = apiDoc;
