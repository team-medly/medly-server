import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersEntity } from './entity/users.entity';
import { handlingError } from 'src/common/utils/handlingError';
import { WithdrawalLogsService } from '../withdrawalLogs/withdrawalLogs.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepo: Repository<UsersEntity>,
    private withdrawalLogsService: WithdrawalLogsService,
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
      const withdrawalLog = await this.withdrawalLogsService.addWithdrawalLogs(
        idx,
        reason,
      );

      const deletedUser = await this.usersRepo.update(
        { idx },
        { deletedAt: currentTime },
      );

      return { withdrawalLog, deletedUser };
    } catch (error) {
      handlingError(error);
    }
  }
}
