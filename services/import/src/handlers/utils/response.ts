import { APIGatewayProxyResult } from 'aws-lambda';
import {RESPONSE_MESSAGES} from '../constants';

const originHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

export const throwError = (code: number, message?: string) => {
    throw {code, message: message || RESPONSE_MESSAGES[code]};
}

export const createResponse = (code : number, data?: any, responseHeaders?: {[header: string]: boolean | number | string}): APIGatewayProxyResult => {
    return {
        statusCode: code,
        headers: {
            ...originHeaders,
            ...responseHeaders,
        },
        body: data? JSON.stringify(data): RESPONSE_MESSAGES[code],
    }
}