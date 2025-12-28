import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_CONFIG } from '../config/db';

export const dataSource = new DataSource(DB_CONFIG as DataSourceOptions);
