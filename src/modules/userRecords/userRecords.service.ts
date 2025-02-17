import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserRecordsEntity } from './entity/userRecords.entity';
import { handlingError } from '../../common/utils/handlingError';
import { GetPatientListReqQueryDto } from './dto/reqQuery.dto';
import { GetPatientListResDto } from './dto/resBody.dto';

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

  async getPatientList(
    query?: GetPatientListReqQueryDto,
  ): Promise<GetPatientListResDto> {
    try {
      const queryBuilder = this.userRecordsRepo
        .createQueryBuilder('userRecords')
        .leftJoinAndSelect('userRecords.user', 'user')
        .where('user.deletedAt IS NULL')
        .andWhere('userRecords.deletedAt IS NULL');

      if (query?.name) {
        queryBuilder.andWhere('user.name LIKE :name', {
          name: `%${decodeURIComponent(query.name)}%`,
        });
      }
      if (query?.patientId) {
        queryBuilder.andWhere('user.patientId = :patientId', {
          patientId: query.patientId,
        });
      }

      queryBuilder.orderBy('userRecords.scheduledAt', 'DESC');

      const records = await queryBuilder.getMany();
      const patients = records.map((record) => ({
        idx: record.idx,
        name: record.user.name,
        patientId: record.user.patientId,
        dateOfBirth: record.user.dateOfBirth,
        scheduledAt: record.scheduledAt,
        status: record.status,
        nameOfSurgery: record.nameOfSurgery,
        surgeryRecord: record.surgeryRecord,
      }));

      return {
        patients,
        total: patients.length,
      };
    } catch (err) {
      handlingError(err);
    }
  }
}
