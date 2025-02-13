import { Injectable } from '@nestjs/common';
import { CreateOneChatBotHistoriesDto } from './dto/CreateOneChatBotHistories.dto';
import { ChatBotHistoriesEntity } from './entities/chatBotHistories.entity';
import { ChatUserHistoriesEntity } from '../chatUserHistories/entities/chatUserHistories.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsEntity } from '../doctors/entities/doctor.entity';
import { FindOneByQueryIdxChatBotHistoriesDto } from './dto/FindOneByQueryIdxChatBotHistories.dto';
import { FindAllByDoctorIdxChatBotHistoriesDto } from './dto/FindAllByDoctorIdxChatBotHistories.dto';
import { DeleteOneByIdxChatBotHistoriesDto } from './dto/DeleteOneByIdxChatBotHistories.dto';

@Injectable()
export class ChatBotHistoriesService {
  constructor(
    @InjectRepository(ChatBotHistoriesEntity)
    private chatBotHistoriesRepository: Repository<ChatBotHistoriesEntity>,
  ) {}

  async createOne(createOneChatBotHistoriesDto: CreateOneChatBotHistoriesDto) {
    const chatBot = new ChatBotHistoriesEntity();
    chatBot.answer = createOneChatBotHistoriesDto.answer;
    chatBot.chatUserHistory = new ChatUserHistoriesEntity();
    chatBot.chatUserHistory.idx = createOneChatBotHistoriesDto.queryIdx;
    return this.chatBotHistoriesRepository.save(chatBot);
  }

  async findOneByQueryIdx(
    findOneByQueryIdxChatBotHistoriesDto: FindOneByQueryIdxChatBotHistoriesDto,
  ): Promise<ChatBotHistoriesEntity> {
    const chatUser = new ChatUserHistoriesEntity();
    chatUser.idx = findOneByQueryIdxChatBotHistoriesDto.queryIdx;
    return this.chatBotHistoriesRepository.findOne({
      where: {
        chatUserHistory: chatUser,
      },
    });
  }

  async findAllByDoctorIdx(
    findAllByDoctorIdxChatBotHistoriesDto: FindAllByDoctorIdxChatBotHistoriesDto,
  ): Promise<ChatBotHistoriesEntity[]> {
    const chatUser = new ChatUserHistoriesEntity();
    chatUser.doctor = new DoctorsEntity();
    chatUser.doctor.idx = findAllByDoctorIdxChatBotHistoriesDto.doctorIdx;
    return this.chatBotHistoriesRepository.find({
      where: {
        chatUserHistory: chatUser,
      },
    });
  }

  async deleteOneByIdx(
    deleteOneByIdxChatBotHistoriesDto: DeleteOneByIdxChatBotHistoriesDto,
  ) {
    const chatBot = await this.chatBotHistoriesRepository.findOne({
      where: {
        idx: deleteOneByIdxChatBotHistoriesDto.idx,
      },
    });
    return this.chatBotHistoriesRepository.softRemove(chatBot);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} chatBotHistory`;
  // }

  // update(id: number, updateChatBotHistoryDto: UpdateChatBotHistoryDto) {
  //   return `This action updates a #${id} chatBotHistory`;
  // }
}
