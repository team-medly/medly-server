import { Module } from '@nestjs/common';
import { ChatUserHistoriesService } from './chatUserHistories.service';
import { ChatUserHistoriesController } from './chatUserHistories.controller';

@Module({
  controllers: [ChatUserHistoriesController],
  providers: [ChatUserHistoriesService],
})
export class ChatUserHistoriesModule {}
