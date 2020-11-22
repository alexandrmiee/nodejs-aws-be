import 'source-map-support/register';
import {S3Event} from 'aws-lambda';
import {
    S3, SQS,
} from 'aws-sdk';
import {createLogger} from 'bunyan';

import {
    BUCKET, REGION,
} from '../config';
const csvParser = require('csv-parser');

const uploadedFolder = 'uploaded';
const parsedFolder = 'parsed';
const logger = createLogger({name: 'importFileParserLogger'});
const {SQS_URL} = process.env;

export const importFileParser = (event: S3Event) => {
    logger.info({event});
    const s3 = new S3({region: REGION});
    const sqs = new SQS();
    event.Records.forEach(record => {
        logger.info('new file',record.s3.object.key);
        const parserStream = s3.getObject({
            Bucket: BUCKET,
            Key: record.s3.object.key,
        }).createReadStream();

        parserStream
            .pipe(csvParser())
            .on('error', error => logger.error({error}))
            .on('data', data => {
                logger.info(data)
                sqs.sendMessage(
                    {
                        QueueUrl: SQS_URL,
                        MessageBody: JSON.stringify(data),
                    },
                    (error, result)=>{
                        if(error) {
                            logger.error('sqs message sended with error', error)
                        } else {
                            logger.info('sqs message sended with data', result)
                        }
                    }
                );
            })
            .on('end', async () => {
                logger.info(record.s3.object.key,'file uploaded');
                await s3.copyObject({
                    Bucket: BUCKET,
                    CopySource: `${BUCKET}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace(uploadedFolder,parsedFolder),
                }).promise();
                logger.info(record.s3.object.key,'file copied into', parsedFolder);
                await s3.deleteObject({
                    Bucket: BUCKET,
                    Key: record.s3.object.key,
                }).promise();
                logger.info(record.s3.object.key,'file deleted from', uploadedFolder);
            });
    });
}
