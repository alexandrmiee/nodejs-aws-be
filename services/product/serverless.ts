import type {Serverless} from 'serverless/aws';

import {CORS} from '../../constants';
import {ENVIRONMENT} from './enviroment';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'product',
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: {
                forceInclude: ['pg'],
            },
        },
        documentation: './serverless.doc.yml',
    },
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
        environment: ENVIRONMENT,
    },
    functions: {
        getProducts: {
            handler: './src/handlers/handlers.getProducts',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products',
                        cors: CORS,
                    },
                },
            ],
        },
        getProduct: {
            handler: './src/handlers/handlers.getProduct',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'products/{id}',
                        cors: CORS,
                    },
                },
            ],
        },
        createProduct: {
            handler: './src/handlers/handlers.createProduct',
            events: [
                {
                    http: {
                        method: 'post',
                        path: 'product',
                        cors: CORS,
                    },
                },
            ],
        },
    },
}

module.exports = serverlessConfiguration;
