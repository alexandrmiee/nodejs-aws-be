import { importProductsFile as importProductsFileHandler } from './importProductsFile';
import { createHandlerWithLogger } from './handleFactory';

export const importProductsFile = createHandlerWithLogger(importProductsFileHandler, 'importProductsFileLogger');

export { importFileParser } from './importFileParser';