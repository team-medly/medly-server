import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import * as path from 'path';

import { UsersModule } from './modules/users/users.module';
import { UsersEntity } from './modules/users/entity/users.entity';
import { UserLogsModule } from './modules/userLogs/userLogs.module';
import { UserLogsEntity } from './modules/userLogs/entity/userLogs.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(process.env.PWD, '.env'),
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [UsersEntity, UserLogsEntity],
          synchronize: process.env.DB_SYNCHRONIZE === 'true',
          logging: true,
          timezone: 'Z',
          ssl:
            process.env.DB_DATABASE !== 'medly_local'
              ? {
                  ca: process.env.AZURE_DB_SSL,
                }
              : false,
        };
      },
    }),
    UsersModule,
    UserLogsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
