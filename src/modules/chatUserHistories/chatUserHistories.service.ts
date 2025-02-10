import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateOneChatUserHistoriesDto } from './dto/CreateOneChatUserHistories.dto';
import { UpdateOneChatUserHistoriesDto } from './dto/UpdateOneChatUserHistories.dto';
import { ChatUserHistoriesEntity } from './entities/chatUserHistories.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsEntity } from '../doctors/entities/doctor.entity';
import { ChatBotHistoriesEntity } from '../chatBotHistories/entities/chatBotHistories.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { FindAllByDoctorIdxChatUserHistoriesDto } from './dto/FindAllByDoctorIdxChatUserHistories.dto';
import { DeleteOneChatUserHistoriesDto } from './dto/DeleteOneChatUserHistories.dto';

@Injectable()
export class ChatUserHistoriesService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ChatUserHistoriesEntity)
    private chatUserHistoriesRepository: Repository<ChatUserHistoriesEntity>,
  ) {}

  async createOne(createOneChatUserHistoriesDto: CreateOneChatUserHistoriesDto) {
    const chatUser = new ChatUserHistoriesEntity();
    chatUser.query = createOneChatUserHistoriesDto.query;
    chatUser.doctor = new DoctorsEntity();
    chatUser.doctor.idx = createOneChatUserHistoriesDto.doctorIdx;
    return this.chatUserHistoriesRepository.save(chatUser);
  }
  
  async findAllByDoctorIdx(findAllByDoctorIdxChatUserHistoriesDto: FindAllByDoctorIdxChatUserHistoriesDto): Promise<ChatUserHistoriesEntity[]> {
    const doctor = new DoctorsEntity();
    doctor.idx = findAllByDoctorIdxChatUserHistoriesDto.doctorIdx;
    return this.chatUserHistoriesRepository.find({
      where: {
        doctor: doctor,
      },
    });
  }

  async deleteOneByIdx(deleteOneChatUserHistoriesDto: DeleteOneChatUserHistoriesDto) {
    const chatUser = await this.chatUserHistoriesRepository.findOne({
      where: {
        idx: deleteOneChatUserHistoriesDto.idx,
      },
      relations: {
        chatBotHistory: true,
      },
    });
    return this.chatUserHistoriesRepository.softRemove(chatUser);
  }
}
