export const SWAGGER_OPTIONS = {
  definition: {
    openapi: '3.0.1',
    swagger: '3.0',
    info: {
      title: 'Sample Server API',
      version: 'v1',
      description: 'sample server',
      contact: {
        name: 'swagger.json',
        url: 'http://localhost/api/swagger.json',
      },
    },
    host: '127.0.0.1:5000',
    schemes: ['http'],
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
    servers: [
      {
        url: 'http://localhost',
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};
