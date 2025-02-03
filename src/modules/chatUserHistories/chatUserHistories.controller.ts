import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatUserHistoriesService } from './chatUserHistories.service';
import { CreateChatUserHistoryDto } from './dto/createChatUserHistories.dto';
import { UpdateChatUserHistoryDto } from './dto/updateChatUserHistories.dto';

@Controller('chatUserHistories')
export class ChatUserHistoriesController {
  constructor(
    private readonly chatUserHistoriesService: ChatUserHistoriesService,
  ) {}

  @Post()
  create(@Body() createChatUserHistoryDto: CreateChatUserHistoryDto) {
    return this.chatUserHistoriesService.create(createChatUserHistoryDto);
  }

  @Get()
  findAll() {
    return this.chatUserHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatUserHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatUserHistoryDto: UpdateChatUserHistoryDto,
  ) {
    return this.chatUserHistoriesService.update(+id, updateChatUserHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatUserHistoriesService.remove(+id);
  }
}
