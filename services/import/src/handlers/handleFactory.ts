import { APIGatewayProxyEvent, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { createLogger } from 'bunyan';
import Logger from 'bunyan';

import { createResponse } from './utils';
import { RESPONSE_CODES } from './constants';


type HandlerFunction = (event: APIGatewayProxyEvent, context: Context, logger?: Logger) => void | Promise<APIGatewayProxyResult>;

export const createHandlerWithLogger = (handler: HandlerFunction, handlerName:string='HandlerLogger') => {
    const logger = createLogger({name: handlerName});
    return async (event: APIGatewayProxyEvent, context: Context, getConfig?: Callback<APIGatewayProxyResult>) => {
        logger.info({event, context});
        try {
            return await handler(event, context, logger);
        } catch(error) {
            logger.error(error);
            return createResponse(error?.code || RESPONSE_CODES.SERVER_ERROR,error?.message || error);
        } finally {
            logger.info('done');
        }
    }
}