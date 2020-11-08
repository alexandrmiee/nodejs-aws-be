import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from 'aws-lambda';
import { Connection, createConnection } from "typeorm";
import { createLogger } from 'bunyan';
import Logger from 'bunyan';

import { dbConnectionConfig } from '../config';
import { Product, Stock } from '../entity';
import { createResponse } from './utils';
import { RESPONSE_CODES } from './constants';

const {NODE_ENV} = process.env;
const logger = createLogger({name: 'HandlerLogger'});

type HandlerFunction = (event: APIGatewayProxyEvent, context: Context, connection: Connection, logger?: Logger) => void | Promise<APIGatewayProxyResult>;

export const createHandlerWithLogger = (handler: HandlerFunction) =>
    async (event: APIGatewayProxyEvent, context: Context, getConfig: Callback<APIGatewayProxyResult>) => {
        logger.info({event, context});
        let connection: Connection;
        try{
            const config = (NODE_ENV!=='production')
                ? (getConfig() as any)
                : {
                    ...dbConnectionConfig,
                    entities: [Product, Stock],
                };

            connection = await createConnection(config);

            return await handler(event, context, connection, logger);
        } catch(error) {
            logger.error(error);
            return createResponse(error?.code || RESPONSE_CODES.SERVER_ERROR,error?.message || error);
        } finally {
            connection?.close();
        }
    }