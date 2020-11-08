import Logger from "bunyan";
import { Connection } from "typeorm";
import 'source-map-support/register';

import { Product } from '../entity';
import { createResponse, throwError } from './utils';
import { RESPONSE_CODES } from './constants';

export const getProducts = async (_event, _context, connection: Connection, _logger: Logger) => {
    const productsRepo = connection.getRepository(Product);

    const productsWithStock: Product[] = await productsRepo
    .createQueryBuilder('p')
    .leftJoinAndSelect("p.stock", "stock")
    .getMany();

    if(!productsWithStock?.length) {
        throwError(RESPONSE_CODES.NOT_FOUND)
    }
    const result = productsWithStock.map(({stock, ...product}) => ({...product, count: stock?.count}));
    return createResponse(RESPONSE_CODES.SUCCESS,result)
}
