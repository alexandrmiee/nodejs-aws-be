import {createHandlerWithLoggerWithDbConnection} from '../utils';

import {getProduct as getProductHandler} from './getProduct';
import {getProducts as getProductsHandler} from './getProducts';
import {createProduct as createProductHandler} from './createProduct';
import {catalogBatchProcess as catalogBatchProcessHandler} from './catalogBatchProcess';

export const getProduct = createHandlerWithLoggerWithDbConnection(getProductHandler,'getProductByIdLogger');
export const getProducts = createHandlerWithLoggerWithDbConnection(getProductsHandler,'getProductsListLogger');
export const createProduct = createHandlerWithLoggerWithDbConnection(createProductHandler,'createProductLogger');
export const catalogBatchProcess = createHandlerWithLoggerWithDbConnection(
    catalogBatchProcessHandler,
    'catalogBatchProcessLogger'
);