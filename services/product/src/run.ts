import {
    getProducts,
    getProduct,
    createProduct,
} from './handlers/handlers';
import * as config from '../ormconfig.json';

(async ()=>{
    try {
        // let products = await getProducts(null,null, () => config);
        // console.log({products});

        // let product = await getProduct(null,null, () => config);
        // console.log({product});
        // let product = await getProduct({pathParameters: {id: "453a2c9d-105a-482a-963b-55230b4c484f"}} as any,null, () => config);
        // console.log({product})

        const createResult = await createProduct({
            body: JSON.stringify({
                "description":"Описание New Product",
                "title":"Продукт test",
                "count": 4,
                "price": 22,
            })
        } as any,null, () => config);
        console.log({createResult})
    } catch(e) {
        console.log(e)
    }
})();
