import { APIGatewayProxyResult } from 'aws-lambda';
import {RESPONSE_MESSAGES, RESPONSE_CODES} from '../constants';

const originHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export const throwError = (code: RESPONSE_CODES, message?: string) => {
    throw {code, message: message || RESPONSE_MESSAGES[code]};
}

export const createResponse = (code : RESPONSE_CODES, data?: any, responseHeaders?: {[header: string]: boolean | number | string}): APIGatewayProxyResult => {
    return {
        statusCode: code,
        headers: {
            ...originHeaders,
            ...responseHeaders,
        },
        body: data? JSON.stringify(data): RESPONSE_MESSAGES[code],
    }
}