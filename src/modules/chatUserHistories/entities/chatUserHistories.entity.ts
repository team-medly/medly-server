import {
	Column, 
	CreateDateColumn, 
	Entity, 
	ManyToOne, 
	OneToOne, 
	PrimaryGeneratedColumn
} from "typeorm";

import { ChatBotHistoriesEntity } from "src/modules/chatBotHistories/entities/chatBotHistories.entity";
import { DoctorsEntity } from "src/modules/doctors/entities/doctor.entity";

@Entity('chatUserHistories')
export class ChatUserHistoriesEntity {
	@PrimaryGeneratedColumn({
		type: 'int',
		comment: '사용자(의사) 쿼리 인덱스'
	})
	idx: number;

	@Column({
		type: 'varchar',
		comment: '사용자 쿼리 문자열'
	})
	query: string;
	
	@CreateDateColumn({
		name: 'createdAt',
		comment: '쿼리 생성일'
	})
	createdAt: Date;
	
	@ManyToOne(() => DoctorsEntity, (doctor) => doctor.chatUserHistories)
	doctor: DoctorsEntity;

	@OneToOne(() => ChatBotHistoriesEntity, (chatBotHistory) => chatBotHistory.query)
	chatBotHistory: ChatBotHistoriesEntity;
}
