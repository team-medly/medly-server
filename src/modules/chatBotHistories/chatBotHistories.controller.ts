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
import { CreateOneChatBotHistoriesDto } from './dto/CreateOneChatBotHistories.dto';
import { UpdateChatBotHistoriesDto } from './dto/UpdateChatBotHistories.dto';
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
import { FindOneByQueryIdxChatBotHistoriesDto } from './dto/FindOneByQueryIdxChatBotHistories.dto';
import { FindAllByDoctorIdxChatBotHistoriesDto } from './dto/FindAllByDoctorIdxChatBotHistories.dto';
import { DeleteOneByIdxChatBotHistoriesDto } from './dto/DeleteOneByIdxChatBotHistories.dto';

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
  async createOne(
    @Body() createOneChatBotHistoriesDto: CreateOneChatBotHistoriesDto,
  ) {
    return this.chatBotHistoriesService.createOne(createOneChatBotHistoriesDto);
  }

  @Get(':queryIdx')
  @ApiOperation({
    summary: '사용자 질문에 대한 챗봇 답변 불러오기',
    description: '사용자 질문에 대한 챗봇의 답변 문자열을 DB에서 불러온다.',
  })
  @ApiOkResponse({ description: '불러오기 성공' })
  @ApiNotFoundResponse({ description: '불러오기 실패' })
  @ApiInternalServerErrorResponse({ description: '불러오기 실패' })
  async findOneByQueryIdx(
    @Param()
    findOneByQueryIdxChatBotHistoriesDto: FindOneByQueryIdxChatBotHistoriesDto,
  ) {
    if (!findOneByQueryIdxChatBotHistoriesDto) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.chatBotHistoriesService.findOneByQueryIdx(
      findOneByQueryIdxChatBotHistoriesDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: '사용자 기준, 챗봇 답변 모두 불러오기',
    description: '사용자의 모든 질문에 대한 챗봇 답변들을 모두 불러온다.',
  })
  @ApiOkResponse({ description: '불러오기 성공' })
  @ApiNotFoundResponse({ description: '불러오기 실패' })
  @ApiInternalServerErrorResponse({ description: '불러오기 실패' })
  async findAllByDoctorIdx(
    @Query()
    findAllByDoctorIdxChatBotHistoriesDto: FindAllByDoctorIdxChatBotHistoriesDto,
  ) {
    if (!findAllByDoctorIdxChatBotHistoriesDto) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    return this.chatBotHistoriesService.findAllByDoctorIdx(
      findAllByDoctorIdxChatBotHistoriesDto,
    );
  }

  @Delete(':idx')
  @ApiOperation({
    summary: '사용자 질문에 대한 챗봇 답변 삭제',
    description:
      '챗봇이 사용자 질의 문자열에 대해 답변한 문자열을 idx 기준으로 DB에서 삭제한다.',
  })
  @ApiOkResponse({ description: '삭제 성공' })
  @ApiNotFoundResponse({ description: '삭제 실패' })
  @ApiInternalServerErrorResponse({ description: '삭제 실패' })
  async deleteOneByIdx(
    @Param()
    deleteOneByIdxChatBotHistoriesDto: DeleteOneByIdxChatBotHistoriesDto,
  ) {
    return this.chatBotHistoriesService.deleteOneByIdx(
      deleteOneByIdxChatBotHistoriesDto,
    );
  }
}
