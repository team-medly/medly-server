import { Module } from '@nestjs/common';
import { ChatBotHistoriesService } from './chatBotHistories.service';
import { ChatBotHistoriesController } from './chatBotHistories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatBotHistoriesEntity } from './entities/chatBotHistories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatBotHistoriesEntity])],
  controllers: [ChatBotHistoriesController],
  providers: [ChatBotHistoriesService],
})
export class ChatBotHistoriesModule {}
