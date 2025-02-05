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
import { ChatUserHistoriesService } from './chatUserHistories.service';
import { InsertOneChatUserHistoryDto } from './dto/insertOneChatUserHistories.dto';
import { UpdateChatUserHistoryDto } from './dto/updateChatUserHistories.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ChatUserHistoriesEntity } from './entities/chatUserHistories.entity';

@ApiTags('챗봇 API')
@Controller('chats/user')
export class ChatUserHistoriesController {
  constructor(
    private readonly chatUserHistoriesService: ChatUserHistoriesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: '사용자 챗봇 쿼리 저장',
    description: '사용자가 챗봇에 질의한 쿼리 문자열을 DB에 저장한다.',
  })
  @ApiOkResponse({ description: '저장 성공' })
  @ApiNotFoundResponse({ description: '저장 실패' })
  @ApiInternalServerErrorResponse({ description: '저장 실패' })
  async insertOne(
    @Body() insertOneChatUserHistoryDto: InsertOneChatUserHistoryDto,
  ) {
    return this.chatUserHistoriesService.insertOne(insertOneChatUserHistoryDto);
  }

  @Get()
  @ApiOperation({
    summary: '사용자 기준, 챗봇 쿼리 모두 불러오기',
    description: 'DB에 저장된 사용자의 챗봇 쿼리 문자열들을 불러온다.',
  })
  @ApiOkResponse({ description: '불러오기 성공' })
  @ApiNotFoundResponse({ description: '불러오기 실패' })
  @ApiInternalServerErrorResponse({ description: '불러오기 실패' })
  @ApiQuery({
    name: 'doctorIdx',
    required: true,
    description: '사용자(의사) 인덱스',
  })
  async selectAll(
    @Query('doctorIdx') doctorIdx,
  ): Promise<ChatUserHistoriesEntity[]> {
    if (!doctorIdx) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return await this.chatUserHistoriesService.selectAll(+doctorIdx);
  }

  @Delete(':idx')
  @ApiOperation({
    summary: '사용자 챗봇 쿼리 삭제',
    description:
      '사용자가 챗봇에 질의한 쿼리 문자열을 쿼리 인덱스 기준으로 DB에서 삭제한다.',
  })
  @ApiOkResponse({ description: '삭제 성공' })
  @ApiNotFoundResponse({ description: '삭제 실패' })
  @ApiInternalServerErrorResponse({ description: '삭제 실패' })
  @ApiParam({
    name: 'idx',
    required: true,
    description: '사용자 챗봇 쿼리 인덱스',
  })
  async deleteOne(@Param('idx') idx) {
    return this.chatUserHistoriesService.deleteOne(+idx);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.chatUserHistoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatUserHistoryDto: UpdateChatUserHistoryDto) {
  //   return this.chatUserHistoriesService.update(+id, updateChatUserHistoryDto);
  // }
}
