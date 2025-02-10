import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatUserHistoriesEntity } from '../chatUserHistories/entities/chatUserHistories.entity';
import { ChatBotHistoriesEntity } from '../chatBotHistories/entities/chatBotHistories.entity';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatUserHistoriesModule } from '../chatUserHistories/chatUserHistories.module';
import { ChatUserHistoriesService } from '../chatUserHistories/chatUserHistories.service';
import { ChatBotHistoriesModule } from '../chatBotHistories/chatBotHistories.module';

@Module({
  imports: [
    //   TypeOrmModule.forFeature([ChatUserHistoriesEntity, ChatBotHistoriesEntity]),
    ChatUserHistoriesModule,
    ChatBotHistoriesModule,
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export class ChatsModule {}
