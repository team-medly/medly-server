import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserRecordsEntity } from './entity/userRecords.entity';
import { handlingError } from 'src/common/utils/handlingError';

@Injectable()
export class UserRecordsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserRecordsEntity)
    private userRecordsRepo: Repository<UserRecordsEntity>,
  ) {}

  async addUserLog(
    userIdx: number,
    nameOfSurgery: string,
    surgeryRecord: string,
  ): Promise<UserRecordsEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUserLog = this.userRecordsRepo.create({
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
