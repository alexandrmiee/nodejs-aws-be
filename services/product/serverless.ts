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
      includeModules: true
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
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    getProducts: {
      handler: 'getProducts.getProducts',
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
      handler: 'getProduct.getProduct',
      events: [
        {
          http: {
            method: 'get',
            path: 'product/{id}',
            cors,
          },
        }
      ],
    },
  }
}

module.exports = serverlessConfiguration;
