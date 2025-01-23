import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { WithdrawalLogsEntity } from './entity/withdrawalLogs.entity';
import { handlingError } from 'src/common/utils/handlingError';

@Injectable()
export class WithdrawalLogsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(WithdrawalLogsEntity)
    private withdrawalLogsRepo: Repository<WithdrawalLogsEntity>,
  ) {}

  async addWithdrawalLogs(
    userIdx: number,
    reason: string,
  ): Promise<WithdrawalLogsEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newWithdrawalLogs = new WithdrawalLogsEntity();
      newWithdrawalLogs.reason = reason;
      newWithdrawalLogs.user = { idx: userIdx } as any;
      const savedWithdrawalLogs =
        await queryRunner.manager.save(newWithdrawalLogs);
      await queryRunner.commitTransaction();
      return savedWithdrawalLogs;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      handlingError(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
