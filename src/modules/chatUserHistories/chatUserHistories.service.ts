import { HttpStatus, Injectable } from '@nestjs/common';
import { InsertOneChatUserHistoryDto } from './dto/insertOneChatUserHistories.dto';
import { UpdateChatUserHistoryDto } from './dto/updateChatUserHistories.dto';
import { ChatUserHistoriesEntity } from './entities/chatUserHistories.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsEntity } from '../doctors/entities/doctor.entity';
import { ChatBotHistoriesEntity } from '../chatBotHistories/entities/chatBotHistories.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class ChatUserHistoriesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ChatUserHistoriesEntity)
    private chatUserHistoriesRepository: Repository<ChatUserHistoriesEntity>,
  ) {}

  async insertOne(insertOneChatUserHistoryDto: InsertOneChatUserHistoryDto) {
    const chat = new ChatUserHistoriesEntity();
    chat.query = insertOneChatUserHistoryDto.query;
    chat.doctor = new DoctorsEntity();
    chat.doctor.idx = insertOneChatUserHistoryDto.doctorIdx;
    const saveResponse = this.chatUserHistoriesRepository.save(chat);
    return { message: 'OK' };
  }

  async selectAll(doctorIdx: number): Promise<ChatUserHistoriesEntity[]> {
    const doctor = new DoctorsEntity();
    doctor.idx = doctorIdx;
    return await this.chatUserHistoriesRepository.find({
      where: {
        doctor: doctor,
      },
    });
  }

  async deleteOne(idx: number) {
    const query = await this.chatUserHistoriesRepository.findOne({
      where: {
        idx: idx,
      },
      relations: {
        chatBotHistory: true,
      },
    });
    const softRemoveResponse =
      this.chatUserHistoriesRepository.softRemove(query);
    return { message: 'OK' };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} chatUserHistory`;
  // }

  // update(id: number, updateChatUserHistoryDto: UpdateChatUserHistoryDto) {
  //   return `This action updates a #${id} chatUserHistory`;
  // }
}
