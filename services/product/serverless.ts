import type {Serverless} from 'serverless/aws';

import {
    CORS,
    CATALOG_ITEMS_SQS,
    CREATE_PRODUCT_SNS_TOPIC_SUCCESS,
    CREATE_PRODUCT_SNS_TOPIC_ERROR,
} from '../../constants';
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
        environment: {
            ...ENVIRONMENT,
            SNS_TOPIC_SUCCESS_ARN: {Ref: 'SNSTopicSuccess'},
            SNS_TOPIC_ERROR_ARN: {Ref: 'SNSTopicError'},
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 'sns:*',
                Resource: {Ref: 'SNSTopicSuccess'},
            },
        ],
    },
    resources: {
        Resources: {
            SQSQueue: {
                Type: 'AWS::SQS::Queue',
                Properties: {
                    QueueName: CATALOG_ITEMS_SQS,
                },
            },
            SNSTopicSuccess: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: CREATE_PRODUCT_SNS_TOPIC_SUCCESS,
                },
            },
            SNSSubscriptionSuccess: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'diktator007@gmail.com',
                    Protocol: 'email',
                    TopicArn: {Ref: 'SNSTopicSuccess'},
                },
            },
            SNSTopicError: {
                Type: 'AWS::SNS::Topic',
                Properties: {
                    TopicName: CREATE_PRODUCT_SNS_TOPIC_ERROR,
                },
            },
            SNSSubscriptionError: {
                Type: 'AWS::SNS::Subscription',
                Properties: {
                    Endpoint: 'lukovnikov.alexandr@gmail.com',
                    Protocol: 'email',
                    TopicArn: {Ref: 'SNSTopicError'},
                },
            },
        },
        Outputs: {
            SQSQueueURL: {
                Description : "SQS CATALOG_ITEMS_SQS Queue URL",
                Value : {Ref: 'SQSQueue'},
                Export : {Name : {"Fn::Sub": "SQSQueue-SQSQueueURL"}},
            },
            SQSQueueARN: {
                Description : "SQS CATALOG_ITEMS_SQS Queue URL",
                Value : {'Fn::GetAtt':['SQSQueue', 'Arn']},
                Export : {Name : {"Fn::Sub": "SQSQueue-SQSQueueARN"}},
            },
        },
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
        catalogBatchProcess: {
            handler: './src/handlers/handlers.catalogBatchProcess',
            events: [
                {
                    sqs: {
                        batchSize: 5,
                        arn: {
                            'Fn::GetAtt':['SQSQueue', 'Arn'],
                        },
                    },
                },
            ],
        },
    },
}

module.exports = serverlessConfiguration;
