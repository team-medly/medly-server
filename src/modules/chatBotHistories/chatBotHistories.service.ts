import { Injectable } from '@nestjs/common';
import { InsertOneChatBotHistoryDto } from './dto/insertOneChatBotHistories.dto';
import { UpdateChatBotHistoryDto } from './dto/updateChatBotHistories.dto';
import { ChatBotHistoriesEntity } from './entities/chatBotHistories.entity';
import { ChatUserHistoriesEntity } from '../chatUserHistories/entities/chatUserHistories.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsEntity } from '../doctors/entities/doctor.entity';
import { handlingError } from 'src/common/utils/handlingError';

@Injectable()
export class ChatBotHistoriesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ChatBotHistoriesEntity)
    private chatBotHistoriesRepository: Repository<ChatBotHistoriesEntity>,
  ) {}

  async insertOne(insertOneChatBotHistoryDto: InsertOneChatBotHistoryDto) {
    const chat = new ChatBotHistoriesEntity();
    chat.answer = insertOneChatBotHistoryDto.answer;
    chat.query = new ChatUserHistoriesEntity();
    chat.query.idx = insertOneChatBotHistoryDto.queryIdx;
    const saveResponse = this.chatBotHistoriesRepository.save(chat);
    return { message: 'OK' };
  }

  async selectOne(queryIdx: number): Promise<ChatBotHistoriesEntity> {
    const query = new ChatUserHistoriesEntity();
    query.idx = queryIdx;
    return await this.chatBotHistoriesRepository.findOne({
      where: {
        query: query,
      },
    });
  }

  async selectAll(doctorIdx: number): Promise<ChatBotHistoriesEntity[]> {
    const query = new ChatUserHistoriesEntity();
    query.doctor = new DoctorsEntity();
    query.doctor.idx = doctorIdx;
    return await this.chatBotHistoriesRepository.find({
      where: {
        query: query,
      },
    });
  }

  async deleteOne(queryIdx: number) {
    const answer = await this.chatBotHistoriesRepository.findOne({
      where: {
        idx: queryIdx,
      },
    });
    const softRemoveResponse =
      this.chatBotHistoriesRepository.softRemove(answer);
    return { message: 'OK' };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} chatBotHistory`;
  // }

  // update(id: number, updateChatBotHistoryDto: UpdateChatBotHistoryDto) {
  //   return `This action updates a #${id} chatBotHistory`;
  // }
}
