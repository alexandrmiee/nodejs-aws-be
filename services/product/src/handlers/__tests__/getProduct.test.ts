import {getProduct} from '../getProduct';
import {productMock} from './__mocks__/product.mock';

describe('getProducts', () => {
    it('should return product by id', async () => {
        const expectedProduct = productMock;
        const product = (await getProduct(
            {pathParameters: {id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa"}} as any,
            {} as any,
            () => {}
        )) as any;
        expect.assertions(1);
        expect(product).toEqual(expectedProduct);

    })
})