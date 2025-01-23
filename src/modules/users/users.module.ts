import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entity/users.entity';
import { WithdrawalLogsModule } from '../withdrawalLogs/withdrawalLogs.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), WithdrawalLogsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
