import dotenv from 'dotenv';
dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;
export const SERVER_TIMEOUT = Number(process.env.SERVER_TIMEOUT) || 30000;
export const ENV = process.env.ENV || 'development';

export const WINDOW_MS =  Number(process.env.REQUEST_LIMIT_MAX_WINDOW) * 60 * 1000 || 600000;
export const MAX_REQUESTS = Number(process.env.REQUEST_LIMIT_MAX_REQUESTS) || 10000;

export const DB_USER = process.env.DB_USER || 'postgres';
export const DB_PASS = process.env.DB_PASS || 'postgres';
export const DB_NAME = process.env.DB_NAME || 'dbname';
export const DB_ENDPOINT  = process.env.DB_ENDPOINT  || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT) || 5432;


export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
export const LOG_FILE = process.env.LOG_FILE || 'app.log';

export const JWT_SECRET = process.env.JWT_SECRET || 'jwtSecret';