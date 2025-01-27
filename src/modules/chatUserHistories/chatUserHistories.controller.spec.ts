import { Test, TestingModule } from '@nestjs/testing';
import { ChatUserHistoriesController } from './chatUserHistories.controller';
import { ChatUserHistoriesService } from './chatUserHistories.service';

describe('ChatUserHistoriesController', () => {
  let controller: ChatUserHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatUserHistoriesController],
      providers: [ChatUserHistoriesService],
    }).compile();

    controller = module.get<ChatUserHistoriesController>(ChatUserHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
