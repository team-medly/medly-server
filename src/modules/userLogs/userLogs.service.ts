import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserLogsEntity } from './entity/userLogs.entity';
import { handlingError } from 'src/common/utils/handlingError';

@Injectable()
export class UserLogsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserLogsEntity)
    private userLogsRepo: Repository<UserLogsEntity>,
  ) {}

  async addUserLog(
    userIdx: number,
    nameOfSurgery: string,
    surgeryRecord: string,
  ): Promise<UserLogsEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUserLog = this.userLogsRepo.create({
        nameOfSurgery,
        surgeryRecord,
        user: { idx: userIdx } as any,
      });

      const savedUserLog = await queryRunner.manager.save(newUserLog);
      await queryRunner.commitTransaction();
      return savedUserLog;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      handlingError(err);
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
