import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UsersEntity } from './entity/users.entity';
import { handlingError } from 'src/common/utils/handlingError';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
    private dataSource: DataSource,
  ) {}

  async getUserByPatientId(patientId: string) {
    try {
      const user = this.usersRepo
        .createQueryBuilder(`users`)
        .where(`users.uid = :uid`, { patientId })
        .andWhere(`users.deletedAt IS NULL`)
        .getRawOne();

      return user;
    } catch (err) {
      handlingError(err);
    }
  }

  async deleteUserByIdx(idx: number, reason: string) {
    const currentTime = new Date();

    try {
      const deletedUser = await this.usersRepo.update(
        { idx },
        { deletedAt: currentTime },
      );

      return { deletedUser };
    } catch (error) {
      handlingError(error);
    }
  }
}
