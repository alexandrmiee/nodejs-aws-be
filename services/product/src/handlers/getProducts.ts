import 'source-map-support/register';
import Logger from "bunyan";
import {Connection} from "typeorm";

import {Product} from '../entity';
import {
    createResponse, throwError,
} from '../../../../utils';
import {RESPONSE_CODES} from '../../../../constants';

export const getProducts = async (_event, connection: Connection, _logger: Logger) => {
    const productsRepo = connection.getRepository(Product);

    const productsWithStock: Product[] = await productsRepo
        .createQueryBuilder('p')
        .leftJoinAndSelect("p.stock", "stock")
        .getMany();

    if(!productsWithStock?.length) {
        throwError(RESPONSE_CODES.NOT_FOUND)
    }
    const result = productsWithStock.map(({
        stock, ...product
    }) => ({
        ...product, count: stock?.count,
    }));

    return createResponse(RESPONSE_CODES.SUCCESS,result)
}
