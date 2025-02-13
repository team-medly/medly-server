import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ChatUserHistoriesService } from './chatUserHistories.service';
import { CreateOneChatUserHistoriesDto } from './dto/CreateOneChatUserHistories.dto';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChatUserHistoriesEntity } from './entities/chatUserHistories.entity';
import { FindAllByDoctorIdxChatUserHistoriesDto } from './dto/FindAllByDoctorIdxChatUserHistories.dto';
import { DeleteOneChatUserHistoriesDto } from './dto/DeleteOneChatUserHistories.dto';

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
  async createOne(
    @Body() createOneChatUserHistoriesDto: CreateOneChatUserHistoriesDto,
  ) {
    return this.chatUserHistoriesService.createOne(
      createOneChatUserHistoriesDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: '사용자 기준, 챗봇 쿼리 모두 불러오기',
    description: 'DB에 저장된 사용자의 챗봇 쿼리 문자열들을 불러온다.',
  })
  @ApiOkResponse({ description: '불러오기 성공' })
  @ApiNotFoundResponse({ description: '불러오기 실패' })
  @ApiInternalServerErrorResponse({ description: '불러오기 실패' })
  async findAllByDoctorIdx(
    @Query()
    findAllByDoctorIdxChatUserHistoriesDto: FindAllByDoctorIdxChatUserHistoriesDto,
  ): Promise<ChatUserHistoriesEntity[]> {
    if (!findAllByDoctorIdxChatUserHistoriesDto) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.chatUserHistoriesService.findAllByDoctorIdx(
      findAllByDoctorIdxChatUserHistoriesDto,
    );
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
  async deleteOneByIdx(
    @Param() deleteOneChatUserHistoriesDto: DeleteOneChatUserHistoriesDto,
  ) {
    return this.chatUserHistoriesService.deleteOneByIdx(
      deleteOneChatUserHistoriesDto,
    );
  }
}
