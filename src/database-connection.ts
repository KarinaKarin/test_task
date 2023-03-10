import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const dbOptions = (): MysqlConnectionOptions => {
  return {
    type: <any>process.env.DATABASE_DRIVER,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    dropSchema: false,
    logging: true,
  };
};
