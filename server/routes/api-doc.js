  const apiDoc = {
  openapi: '3.0.3',
  info: {
    title: 'Slug Loop',
    version: '1.0.0',
    description: 'Backend Documentation for Slug Loop',
  },
  paths: {
    '/': {
      // Server description page
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
        parameters: [
          {
            name: 'lastUpdated',
            in: 'query',
            description:
              'Modifies the result so it only returns buses that have been updated within the last x seconds',
            required: false,
            schema: {
              type: 'integer',
            },
          },
        ],

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
    '/metroBuses': {
      // Gets all buses on routes 10, 15, 18, 19, and 20 and returns a json array
      get: {
        description: 'Gets all buses on routes 10, 15, 18, 19, and 20',
        responses: {
          200: {
            description: 'Gets all buses on specified routes',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/busesArray',
                },
              },
            },
          },
          500: {
            description: 'Error fetching buses',
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
            'application/x-www-form-urlencoded': {
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
          401: {
            description: 'Unauthorized',
          },
        },
      },
    },
    '/updateMetroBuses': {
      // Update the metro buses
      put: {
        description: 'Update the metro buses',
        responses: {
          200: {
            description: 'OK',
          },
          500: {
            description: 'Error updating buses',
          },
        },
      },
    },
    '/updateSoon': {
      // Update the soon buses
      post: {
        description: 'Update the soon buses',
        responses: {
          200: {
            description: 'OK',
          },
          500: {
            description: 'Error updating buses',
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
            previousLongitude: {
              type: 'number',
            },
            previousLatitude: {
              type: 'number',
            },
            route: {
              type: 'string',
            },
          },
        },
      },
      metroArray: {
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
            heading: {
              type: 'string',
            },
            capacity: {
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
        required: ['name', 'email', 'message'],
      },
      pingBody: {
        type: 'object',
        properties: {
          data: {
            type: 'string',
            example:
              '[{"sid":"1","id":"1","lon":1,"lat":1,"route":"1", "key":"testKey"}]',
          },
        },
        required: ['data'],
      },
    },
  },
}

// Export
module.exports = apiDoc
