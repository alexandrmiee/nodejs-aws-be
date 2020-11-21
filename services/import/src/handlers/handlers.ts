import {createHandlerWithLogger} from '../../../../utils';
import {importProductsFile as importProductsFileHandler} from './importProductsFile';

export const importProductsFile = createHandlerWithLogger(importProductsFileHandler, 'importProductsFileLogger');

export {importFileParser} from './importFileParser';