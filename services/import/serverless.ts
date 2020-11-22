import type {Serverless} from 'serverless/aws';

import {CORS} from '../../constants';
import {BUCKET} from './src/config';

const serverlessConfiguration: Serverless = {
    service: {
        name: 'import',
    },
    frameworkVersion: '2',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true,
        },
    },
    plugins: ['serverless-webpack'],
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
            SQS_URL : {"Fn::ImportValue" : {"Fn::Sub" : "SQSQueue-SQSQueueURL"}},
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 's3:ListBucket',
                Resource: `arn:aws:s3:::${BUCKET}`,
            },
            {
                Effect: 'Allow',
                Action: 's3:*',
                Resource: `arn:aws:s3:::${BUCKET}/*`,
            },
            {
                Effect: 'Allow',
                Action: 'sqs:*',
                Resource: {"Fn::ImportValue" : {"Fn::Sub" : "SQSQueue-SQSQueueARN"}},
            },
        ],
    },
    functions: {
        importProductsFile: {
            handler: './src/handlers/handlers.importProductsFile',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'import',
                        cors: CORS,
                    },
                },
            ],
        },
        importFileParser: {
            handler: './src/handlers/handlers.importFileParser',
            events: [
                {
                    s3: {
                        bucket: BUCKET,
                        event: 's3:ObjectCreated:*',
                        rules: [
                            {
                                prefix: 'uploaded/',
                                suffix: '',
                            },
                        ],
                        existing: true,
                    },
                },
            ],
        },
    },
}

module.exports = serverlessConfiguration;
