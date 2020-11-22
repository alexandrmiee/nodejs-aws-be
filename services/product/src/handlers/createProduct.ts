import 'source-map-support/register';
import {APIGatewayProxyEvent} from 'aws-lambda';
import {Connection} from "typeorm";
import Logger from "bunyan";

import {
    Product, Stock,
} from '../entity';
import {
    createResponse, throwError,
} from '../../../../utils';
import {RESPONSE_CODES} from '../../../../constants';

export const createProductTransaction = async (product: Product, count: number, connection: Connection ) => {
    if(!count || !product) {
        throwError(RESPONSE_CODES.BAD_REQUEST, 'product or count of products is undefined');
    }

    const queryRunner = connection.createQueryRunner();
    await queryRunner.startTransaction();
    try{
        const productsRepo = connection.getRepository(Product);
        const newProductQuery = productsRepo
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(product)
            .execute();

        const stockRepo = connection.getRepository(Stock);
        const newStockQuery = stockRepo.createQueryBuilder()
            .insert()
            .into(Stock)
            .values({count})
            .execute();

        const [newProduct,
            newStock] = await Promise.all([
            newProductQuery,
            newStockQuery,
        ]);

        await productsRepo
            .createQueryBuilder()
            .relation(Product, 'stock')
            .of(newProduct?.identifiers[0])
            .set(newStock?.identifiers[0]);

        return newProduct.identifiers[0];
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throwError(RESPONSE_CODES.BAD_REQUEST, error?.message);
    }
    finally {
        // you need to release query runner which is manually created:
        await queryRunner.release();
    }
}
export const createProduct = async (event: APIGatewayProxyEvent, connection: Connection, _logger: Logger) => {
    if(!event?.body) {
        throwError(RESPONSE_CODES.BAD_REQUEST, JSON.stringify(event));
    }
    const {
        count, ...product
    } = JSON.parse(event.body);

    await createProductTransaction(product, count, connection);

    return createResponse(RESPONSE_CODES.SAVED);
}

