import {
    Factory, Seeder,
} from 'typeorm-seeding'
import {Connection} from 'typeorm'
import {
    Product, Stock,
} from '../entity'
import {productList} from '../handlers/__tests__/__mocks__/productList.mock';

const products: Product[] = productList.map(
    ({
        count, ...product
    },index) => {return {
        ...product, stock: index,
    } as any}
);
const stocks: Stock[] = productList.map(
    ({
        count, id,
    }, index) =>
        ({
            id: index.toString(),
            count,
            product: products.find(product => product.id === id),
        })
);

export default class CreateProduct implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(products)
            .execute()

        await connection
            .createQueryBuilder()
            .insert()
            .into(Stock)
            .values(stocks)
            .execute()

    }
}