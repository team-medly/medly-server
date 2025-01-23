import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WithdrawalLogsEntity } from './entity/withdrawalLogs.entity';
import { WithdrawalLogsController } from './withdrawalLogs.controller';
import { WithdrawalLogsService } from './withdrawalLogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([WithdrawalLogsEntity])],
  controllers: [WithdrawalLogsController],
  providers: [WithdrawalLogsService],
  exports: [WithdrawalLogsService],
})
export class WithdrawalLogsModule {}
