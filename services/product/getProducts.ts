import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {productList} from './__tests__/__mocks__/productList.mock';

export const getProducts: APIGatewayProxyHandler = async (_event, _context) => {
    const [products] = await Promise.all([
        productList
    ])
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products),
    };
}
