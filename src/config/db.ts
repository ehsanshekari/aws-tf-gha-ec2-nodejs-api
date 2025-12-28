import { DB_ENDPOINT, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "./config";

export const DB_CONFIG = {
    type: 'postgres',
    host: DB_ENDPOINT,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: ['dist/**/*.entity.js'],
    logging: true,
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    supportBigNumbers: true,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  };
  