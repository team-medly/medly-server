import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ChatUserHistoriesEntity } from 'src/modules/chatUserHistories/entities/chatUserHistories.entity';

@Entity('chatBotHistories')
export class ChatBotHistoriesEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '사용자 쿼리에 대한 챗봇 답변 인덱스',
  })
  idx: number;

  @OneToOne(
    () => ChatUserHistoriesEntity,
    (chatUserHistory) => chatUserHistory.chatBotHistory,
  )
  @JoinColumn()
  query: ChatUserHistoriesEntity;

  @Column({
    type: 'varchar',
    comment: ' 챗봇 답변 문자열',
  })
  answer: string;

  @CreateDateColumn({
    name: 'createdAt',
    comment: '답변 생성일',
  })
  createdAt: Date;
}
