import { Test, TestingModule } from '@nestjs/testing';
import { ChatUserHistoriesService } from './chatUserHistories.service';

describe('ChatUserHistoriesService', () => {
  let service: ChatUserHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatUserHistoriesService],
    }).compile();

    service = module.get<ChatUserHistoriesService>(ChatUserHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
