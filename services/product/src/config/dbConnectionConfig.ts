import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const  {
    TYPEORM_DATABASE,
    TYPEORM_HOST,
    TYPEORM_PASSWORD,
    TYPEORM_PORT,
    TYPEORM_USERNAME,
} = process.env;

export const dbConnectionConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: TYPEORM_HOST,
    port: +TYPEORM_PORT,
    username: TYPEORM_USERNAME,
    password: TYPEORM_PASSWORD,
    database: TYPEORM_DATABASE,
    synchronize: false,
    logging: true,
}