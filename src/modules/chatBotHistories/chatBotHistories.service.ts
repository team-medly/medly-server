import { Injectable } from '@nestjs/common';
import { CreateChatBotHistoryDto } from './dto/createChatBotHistories.dto';
import { UpdateChatBotHistoryDto } from './dto/updateChatBotHistories.dto';

@Injectable()
export class ChatBotHistoriesService {
  create(createChatBotHistoryDto: CreateChatBotHistoryDto) {
    return 'This action adds a new chatBotHistory';
  }

  findAll() {
    return `This action returns all chatBotHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatBotHistory`;
  }

  update(id: number, updateChatBotHistoryDto: UpdateChatBotHistoryDto) {
    return `This action updates a #${id} chatBotHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatBotHistory`;
  }
}
