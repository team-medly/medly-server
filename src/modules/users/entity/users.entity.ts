import { UserLogsEntity } from 'src/modules/userLogs/entity/userLogs.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '인덱스',
  })
  idx: number;

  @Column({
    type: 'varchar',
    comment: '환자 번호',
  })
  patientId: string;

  @Column({
    type: 'varchar',
    comment: '환자 이름',
  })
  name: string;

  @Column({
    type: 'varchar',
    comment: '성별',
  })
  gender: 'male' | 'female';

  @CreateDateColumn({
    name: 'dateOfBirth',
    comment: '생년월일',
  })
  dateOfBirth: Date;

  @CreateDateColumn({
    name: 'createdAt',
    comment: '생성일',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updatedAt',
    comment: '수정일',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deletedAt',
    nullable: true,
    comment: '삭제일',
  })
  deletedAt: Date;

  @OneToMany(() => UserLogsEntity, (userLogs) => userLogs.user)
  userLogs: UserLogsEntity[];
}
