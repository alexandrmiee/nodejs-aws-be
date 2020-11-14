import { Connection } from "typeorm";
import Logger from 'bunyan';
import 'source-map-support/register';

import { Product } from '../entity';
import { createResponse, throwError } from './utils';
import { RESPONSE_CODES } from './constants';

export const getProduct = async (event, _context, connection: Connection, _logger: Logger) => {
    if(!event?.pathParameters?.id) {
        throwError(RESPONSE_CODES.NOT_FOUND)
    }

    const productsRepo = connection.getRepository(Product);

    const productWithStock: Product = await productsRepo
    .createQueryBuilder('p')
    .leftJoinAndSelect("p.stock", "stock")
    .where('p.id = :id', {id: event.pathParameters.id})
    .getOne();

    if(!productWithStock) {
        throwError(RESPONSE_CODES.NOT_FOUND)
    }
    const {stock, ...product} = productWithStock;
    const result = ({...product, count: stock?.count});
    return createResponse(RESPONSE_CODES.SUCCESS,result)
}
