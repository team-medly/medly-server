import { Module } from '@nestjs/common';
import { ChatUserHistoriesService } from './chatUserHistories.service';
import { ChatUserHistoriesController } from './chatUserHistories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserHistoriesEntity } from './entities/chatUserHistories.entity';
import { ChatBotHistoriesEntity } from '../chatBotHistories/entities/chatBotHistories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatUserHistoriesEntity])],
  controllers: [ChatUserHistoriesController],
  providers: [ChatUserHistoriesService],
  exports: [ChatUserHistoriesService],
})
export class ChatUserHistoriesModule {}
