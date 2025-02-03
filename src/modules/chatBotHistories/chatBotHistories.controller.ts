import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatBotHistoriesService } from './chatBotHistories.service';
import { CreateChatBotHistoryDto } from './dto/createChatBotHistories.dto';
import { UpdateChatBotHistoryDto } from './dto/updateChatBotHistories.dto';

@Controller('chat-bot-histories')
export class ChatBotHistoriesController {
  constructor(
    private readonly chatBotHistoriesService: ChatBotHistoriesService,
  ) {}

  @Post()
  create(@Body() createChatBotHistoryDto: CreateChatBotHistoryDto) {
    return this.chatBotHistoriesService.create(createChatBotHistoryDto);
  }

  @Get()
  findAll() {
    return this.chatBotHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatBotHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatBotHistoryDto: UpdateChatBotHistoryDto,
  ) {
    return this.chatBotHistoriesService.update(+id, updateChatBotHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatBotHistoriesService.remove(+id);
  }
}
