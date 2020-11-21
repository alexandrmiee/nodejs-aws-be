import type { Serverless } from 'serverless/aws';

const cors = {
  origins: '*',
  headers: [
    'Content-Type',
    'X-Amz-Date',
    'Authorization',
    'X-Api-Key',
    'X-Amz-Security-Token',
    'X-Amz-User-Agent',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
  ]
};

const environment = {
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  NODE_ENV: 'production',
  TYPEORM_DATABASE: 'products_db',
  TYPEORM_HOST: 'ms-product-instance.cwesrixoeljy.eu-west-1.rds.amazonaws.com',
  TYPEORM_PASSWORD: 'iFvw19Mir1fDvNnrfnxH',
  TYPEORM_PORT: 5432,
  TYPEORM_USERNAME: 'postgres',
  TYPEORM_SYNCHRONIZE: false,
  TYPEORM_LOGGING: true,
}

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceInclude: ['pg']
      }
    },
    documentation: './serverless.doc.yml',
  },
  // Add the serverless-webpack plugin
  plugins: [
    'serverless-webpack',
    'serverless-openapi-documentation',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment,
  },
  functions: {
    getProducts: {
      handler: './src/handlers/handlers.getProducts',
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors,
          },
        }
      ],
    },
    getProduct: {
      handler: './src/handlers/handlers.getProduct',
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{id}',
            cors,
          },
        }
      ],
    },
    createProduct: {
      handler: './src/handlers/handlers.createProduct',
      events: [
        {
          http: {
            method: 'post',
            path: 'product',
            cors,
          },
        }
      ],
    },
  }
}

module.exports = serverlessConfiguration;
