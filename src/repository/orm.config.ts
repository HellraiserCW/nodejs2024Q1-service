import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  logging: false,
  migrationsRun: true,
  synchronize: false,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT | 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/*entity.js'],
  migrations: ['dist/**/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize();
