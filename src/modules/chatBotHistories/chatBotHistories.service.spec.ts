import { Test, TestingModule } from '@nestjs/testing';
import { ChatBotHistoriesService } from './chatBotHistories.service';

describe('ChatBotHistoriesService', () => {
  let service: ChatBotHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatBotHistoriesService],
    }).compile();

    service = module.get<ChatBotHistoriesService>(ChatBotHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
