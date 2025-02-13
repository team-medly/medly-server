import { Test, TestingModule } from '@nestjs/testing';
import { ChatUserHistoriesController } from './chatUserHistories.controller';
import { ChatUserHistoriesService } from './chatUserHistories.service';
import { ChatUserHistoriesEntity } from './entities/chatUserHistories.entity';
import { DoctorsEntity } from '../doctors/entities/doctor.entity';

describe('ChatUserHistoriesController', () => {
  let chatUserHistoriesController: ChatUserHistoriesController;
  let chatUserHistoriesService: ChatUserHistoriesService;

  // const mockDoctor: Partial<DoctorsEntity> = {
  //   idx: 1,
  //   email: 'doctor@example.com',
  //   password: 'hashedPassword',
  //   name: '김의사',
  //   role: '전문의',
  //   phone: '01012345678',
  //   gender: 'male',
  //   dateOfBirth: new Date('1980-01-01'),
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   deletedAt: null,
  // };

  // const mockChatUserHistory: Partial<ChatUserHistoriesEntity> = {
  //   idx: 1,
  //   query: '만나서 반가워',
  //   createdAt: new Date(),
  //   doctor: mockDoctor,
  // };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatUserHistoriesController],
      providers: [ChatUserHistoriesService],
    }).compile();

    chatUserHistoriesController = module.get<ChatUserHistoriesController>(
      ChatUserHistoriesController,
    );
    chatUserHistoriesService = module.get<ChatUserHistoriesService>(
      ChatUserHistoriesService,
    );
  });

  it('should be defined', () => {
    expect(chatUserHistoriesController).toBeDefined();
  });
});
