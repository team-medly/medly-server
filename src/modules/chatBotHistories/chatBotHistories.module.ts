import { Module } from '@nestjs/common';
import { ChatBotHistoriesService } from './chatBotHistories.service';
import { ChatBotHistoriesController } from './chatBotHistories.controller';

@Module({
  controllers: [ChatBotHistoriesController],
  providers: [ChatBotHistoriesService],
})
export class ChatBotHistoriesModule {}
