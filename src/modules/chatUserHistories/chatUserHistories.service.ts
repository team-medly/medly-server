import { Injectable } from '@nestjs/common';
import { CreateChatUserHistoryDto } from './dto/createChatUserHistories.dto';
import { UpdateChatUserHistoryDto } from './dto/updateChatUserHistories.dto';

@Injectable()
export class ChatUserHistoriesService {
  create(createChatUserHistoryDto: CreateChatUserHistoryDto) {
    return 'This action adds a new chatUserHistory';
  }

  findAll() {
    return `This action returns all chatUserHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatUserHistory`;
  }

  update(id: number, updateChatUserHistoryDto: UpdateChatUserHistoryDto) {
    return `This action updates a #${id} chatUserHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatUserHistory`;
  }
}
