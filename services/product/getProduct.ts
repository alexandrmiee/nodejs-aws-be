import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import {productList} from './__tests__/__mocks__/productList.mock';

export const getProduct: APIGatewayProxyHandler = async (event, _context) => {
    const [products] = await Promise.all([
        productList
    ]);
    const product = products.find(item => item.id === event.pathParameters.id);
    return {
        statusCode: product? 200: 404,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(product),
    };
}
