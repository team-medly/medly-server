import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserLogsController } from './userLogs.controller';
import { UserLogsService } from './userLogs.service';
import { UserLogsEntity } from './entity/userLogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLogsEntity])],
  controllers: [UserLogsController],
  providers: [UserLogsService],
})
export class UserLogsModule {}
