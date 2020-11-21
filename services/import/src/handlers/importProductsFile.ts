import 'source-map-support/register';
import {APIGatewayProxyEvent} from 'aws-lambda';
import {S3} from 'aws-sdk';
import Logger from 'bunyan';
import {promisify} from 'util';

import {createResponse} from '../../../../utils';
import {RESPONSE_CODES} from '../../../../constants';
import {
    BUCKET, REGION,
} from '../config';

const folder = 'uploaded';
const uploadParams = {
    Bucket: BUCKET,
    Expires: 60,
    ContentType: 'text/csv',
};

export const importProductsFile = async (event: APIGatewayProxyEvent, _context, logger: Logger) => {
    const fileName = event.queryStringParameters?.name;
    const s3 = new S3({region: REGION});
    const getSignedUrl = promisify<string, any, string>(s3.getSignedUrl.bind(s3)) ;
    const url = await getSignedUrl('putObject', {
        ...uploadParams, Key: `${folder}/${fileName}`,
    });
    logger.info({url});

    return createResponse(RESPONSE_CODES.SUCCESS,url)
}
