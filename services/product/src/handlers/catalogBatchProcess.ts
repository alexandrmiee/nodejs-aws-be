import 'source-map-support/register';
import {SQSEvent} from 'aws-lambda';
import {SNS} from 'aws-sdk';
import Logger from 'bunyan';
import {Connection} from "typeorm";

import {createResponse} from '../../../../utils';
import {RESPONSE_CODES} from '../../../../constants';
import {Product} from '../entity';
import {REGION} from '../config';
import {createProductTransaction} from './createProduct';

const {
    SNS_TOPIC_SUCCESS_ARN,
    SNS_TOPIC_ERROR_ARN,
} = process.env;

export const catalogBatchProcess = async (event: SQSEvent, connection: Connection, logger: Logger) => {
    const sns = new SNS({
        region: REGION,
    });
    const promises = event.Records.map( async record => {
        logger.info('new record:', record.body);
        try{
            const {
                count, ...product
            } = JSON.parse(record.body);
            const result = await createProductTransaction(product as Product,count, connection);
            sns.publish(
                {
                    Subject: 'New product created',
                    Message: `data: ${record.body}, id: ${result}`,
                    TopicArn: SNS_TOPIC_SUCCESS_ARN,
                },
                (error, result)=>{
                    if(error) {
                        logger.error('SNS message sended with error', error)
                    } else {
                        logger.info('SNS message sended with data', result)
                    }
                }
            );
            return result;
        } catch (e) {
            sns.publish(
                {
                    Subject: 'New product did not creat',
                    Message: `error: ${e}`,
                    TopicArn: SNS_TOPIC_ERROR_ARN,
                },
                (error, result)=>{
                    if(error) {
                        logger.error('SNS message sended with error', error)
                    } else {
                        logger.info('SNS message sended with data', result)
                    }
                }
            );
            logger.error(e);
        }
    });
    const products = await Promise.all(promises);
    logger.info('all records saved', products);

    return createResponse(RESPONSE_CODES.SAVED);
}
