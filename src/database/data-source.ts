import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';

import { UsersEntity } from '../modules/users/entity/users.entity';
import { UserLogsEntity } from '../modules/userLogs/entity/userLogs.entity';

dotenv.config({
  path: '.env',
});

if (process.env.DB_DATABASE !== 'medly_local') {
  console.error('❌ Seeding is not allowed in production environment');
  process.exit(1);
}

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  entities: [UsersEntity, UserLogsEntity],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  seedTracking: false,
  factories: ['src/database/factories/**/*{.ts,.js}'],
  ssl:
    process.env.DB_DATABASE !== 'medly_local'
      ? {
          ca: process.env.AZURE_DB_SSL,
        }
      : false,
};

export const dataSource = new DataSource(options);
