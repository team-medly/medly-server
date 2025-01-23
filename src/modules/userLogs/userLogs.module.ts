import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserLogsController } from './userLogs.controller';
import { UserLogsService } from './userLogs.service';
import { UserLogsEntity } from './entity/userLogs.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserLogsEntity])],
  controllers: [UserLogsController],
  providers: [UserLogsService],
})
export class UserLogsModule {}
