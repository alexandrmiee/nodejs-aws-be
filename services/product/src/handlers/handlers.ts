import { getProduct as getProductHandler } from './getProduct';
import { getProducts as getProductsHandler } from './getProducts';
import { createProduct as createProductHandler } from './createProduct';
import { createHandlerWithLogger } from './handleFactory';

export const getProduct = createHandlerWithLogger(getProductHandler);
export const getProducts = createHandlerWithLogger(getProductsHandler);
export const createProduct = createHandlerWithLogger(createProductHandler);