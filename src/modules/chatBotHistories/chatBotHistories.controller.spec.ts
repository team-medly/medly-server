import { Test, TestingModule } from '@nestjs/testing';
import { ChatBotHistoriesController } from './chatBotHistories.controller';
import { ChatBotHistoriesService } from './chatBotHistories.service';

describe('ChatBotHistoriesController', () => {
  let controller: ChatBotHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatBotHistoriesController],
      providers: [ChatBotHistoriesService],
    }).compile();

    controller = module.get<ChatBotHistoriesController>(
      ChatBotHistoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
