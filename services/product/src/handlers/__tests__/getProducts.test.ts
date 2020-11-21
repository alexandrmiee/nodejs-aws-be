import {getProducts} from '../getProducts';

describe('getProducts', () => {
    it('should return products list', async () => {
        const expectedProducts = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: '[{"count":4,"description":"Описание 1",\
            "id":"7567ec4b-b10c-48c5-9345-fc73c48a80aa","price":2.4,"title":"Продукт One"},\
            {"count":6,"description":"Описание 3","id":"7567ec4b-b10c-48c5-9345-fc73c48a80a0",\
            "price":10,"title":"Продукт New"},{"count":7,"description":"Описание 2",\
            "id":"7567ec4b-b10c-48c5-9345-fc73c48a80a2","price":23,"title":"Продукт Top"},\
            {"count":12,"description":"Описание 7","id":"7567ec4b-b10c-48c5-9345-fc73c48a80a1",\
            "price":15,"title":"Продукт Title"},{"count":7,"description":"Описание 2",\
            "id":"7567ec4b-b10c-48c5-9345-fc73c48a80a2","price":23,"title":"Продукт "},\
            {"count":8,"description":"Описание 4","id":"7567ec4b-b10c-48c5-9345-fc73348a80a1",\
            "price":15,"title":"Продукт Test"},{"count":2,"description":"Short Продукт  \
            Descriptio1","id":"7567ec4b-b10c-48c5-9445-fc73c48a80a2","price":23,"title":"Продукт 2"},\
            {"count":3,"description":"Описание 7","id":"7567ec4b-b10c-45c5-9345-fc73c48a80a1",\
            "price":15,"title":"Продукт Name"}]',
        };
        const products = await getProducts(
            {} as any,
            {} as any,
            () => {}
        );
        expect.assertions(1);
        console.log(products)
        expect(products).toEqual(expectedProducts);

    })
})