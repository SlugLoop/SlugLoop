/*
  This OpenAPI documentation outlines the endpoints available in the "Slug Loop" backend service. 
  It provides developers with information on how to interact with the API, including descriptions 
  of each endpoint, parameters required, and possible responses returned. 
*/
  
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
    '/metroEta': {
      // Gets ETAs of a metro stop and returns a json array
      get: {
        description: 'Gets all ETAs for a metro stop',
        parameters: [
          {
            name: 'stopId',
            in: 'query',
            description: 'The ID of the metro stop to retrieve ETAs for',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],

        responses: {
          200: {
            description: 'Gets all ETAs for a metro stop',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          400: {
            description: 'Invalid stop ID',
          },
          500: {
            description: 'Error getting ETAs',
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
    '/metroRoutes': {
      // Gets all metro routes and returns a json array
      get: {
        description: 'Gets all metro routes',
        responses: {
          200: {
            description: 'Gets all metro routes',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/metroRoutesArray',
                },
              },
            },
          },
          500: {
            description: 'Error fetching routes',
          },
        },
      },
    },
    '/metroRouteDirections': {
      // Gets metro route directions and returns a json array
      get: {
        description: 'Gets metro route directions',
        responses: {
          200: {
            description: 'Gets metro route directions',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/routeDirectionsArray',
                },
              },
            },
          },
          500: {
            description: 'Error fetching directions',
          },
        },
      },
    },
    '/metroRoutePredictions': {
      // Gets route predictions and returns a json array
      get: {
        description: 'Gets route predictions',
        parameters: [
          {
            name: 'stpid',
            in: 'query',
            description: 'Stop Id of the stop you want predictions for',
            required: true,
            schema: {
              type: 'integer',
            },
          },
        ],
        responses: {
          200: {
            description: 'Gets route predictions',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/routePredictionsArray',
                },
              },
            },
          },
          500: {
            description: 'Error fetching predictions',
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
      metroRoutesArray: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            routeID: {
              type: 'string',
            },
            routeName: {
              type: 'string',
            },
            routeColor: {
              type: 'string',
            },
          },
        },
      },
      routeDirectionsArray: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            routeID: {
              type: 'integer',
            },
            directionID: {
              type: 'string',
            },
            directionName: {
              type: 'string',
            },
          },
        },
      },
      routePredictionsArray: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            timestamp: {
              type: 'string',
            },
            type: {
              type: 'string',
            },
            routeID: {
              type: 'integer',
            },
            predictionTime: {
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
