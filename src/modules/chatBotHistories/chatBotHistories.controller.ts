import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChatBotHistoriesService } from './chatBotHistories.service';
import { InsertOneChatBotHistoryDto } from './dto/insertOneChatBotHistories.dto';
import { UpdateChatBotHistoryDto } from './dto/updateChatBotHistories.dto';
import { ChatBotHistoriesEntity } from './entities/chatBotHistories.entity';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('챗봇 API')
@Controller('chats/bot')
export class ChatBotHistoriesController {
  constructor(
    private readonly chatBotHistoriesService: ChatBotHistoriesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '사용자 질문에 대한 챗봇 답변 저장',
    description:
      '챗봇이 사용자 질의 문자열에 대해 답변한 문자열을 DB에 저장한다.',
  })
  @ApiOkResponse({ description: '저장 성공' })
  @ApiNotFoundResponse({ description: '저장 실패' })
  @ApiInternalServerErrorResponse({ description: '저장 실패' })
  async insertOne(
    @Body() insertOneChatBotHistoryDto: InsertOneChatBotHistoryDto,
  ) {
    return this.chatBotHistoriesService.insertOne(insertOneChatBotHistoryDto);
  }

  @Get(':queryIdx')
  @ApiOperation({
    summary: '사용자 질문에 대한 챗봇 답변 불러오기',
    description: '사용자 질문에 대한 챗봇의 답변 문자열을 DB에서 불러온다.',
  })
  @ApiOkResponse({ description: '불러오기 성공' })
  @ApiNotFoundResponse({ description: '불러오기 실패' })
  @ApiInternalServerErrorResponse({ description: '불러오기 실패' })
  @ApiParam({
    name: 'queryIdx',
    required: true,
    description: '사용자 질의 인덱스',
  })
  async selectOne(@Param('queryIdx') queryIdx) {
    if (!queryIdx) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return await this.chatBotHistoriesService.selectOne(+queryIdx);
  }

  @Get()
  @ApiOperation({
    summary: '사용자 기준, 챗봇 답변 모두 불러오기',
    description: '사용자의 모든 질문에 대한 챗봇 답변들을 모두 불러온다.',
  })
  @ApiOkResponse({ description: '불러오기 성공' })
  @ApiNotFoundResponse({ description: '불러오기 실패' })
  @ApiInternalServerErrorResponse({ description: '불러오기 실패' })
  @ApiQuery({
    name: 'doctorIdx',
    required: true,
    description: '사용자(의사) 인덱스',
  })
  async selectAll(@Query('doctorIdx') doctorIdx) {
    if (!doctorIdx) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return await this.chatBotHistoriesService.selectAll(+doctorIdx);
  }

  @Delete(':queryIdx')
  @ApiOperation({
    summary: '사용자 질문에 대한 챗봇 답변 삭제',
    description:
      '챗봇이 사용자 질의 문자열에 대해 답변한 문자열을 queryIdx 기준으로 DB에서 삭제한다.',
  })
  @ApiOkResponse({ description: '삭제 성공' })
  @ApiNotFoundResponse({ description: '삭제 실패' })
  @ApiInternalServerErrorResponse({ description: '삭제 실패' })
  @ApiParam({
    name: 'queryIdx',
    required: true,
    description: '사용자 질의 인덱스',
  })
  async deleteOne(@Param('queryIdx') queryIdx) {
    return this.chatBotHistoriesService.deleteOne(+queryIdx);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatBotHistoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatBotHistoryDto: UpdateChatBotHistoryDto) {
  //   return this.chatBotHistoriesService.update(+id, updateChatBotHistoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatBotHistoriesService.remove(+id);
  // }
}
