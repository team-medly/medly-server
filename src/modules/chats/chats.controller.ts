import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import {
  RequestAzureOpenAiGptDto,
  RequestAzureOpenAiGptParamDto,
} from './dto/RequestAzureOpenAiGpt.dto';
import {
  FindAllChatsParamDto,
  FindAllChatsQueryDto,
} from './dto/FindAllChats.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('챗봇 API')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post(':doctorIdx')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Azure OpenAI GPT 모델에 요청',
    description: 'Azure OpenAI GPT 모델에 요청',
  })
  @ApiOkResponse({ description: '성공' })
  @ApiNotFoundResponse({ description: '실패' })
  @ApiInternalServerErrorResponse({ description: '실패' })
  async requestAzureOpenAiGpt(
    @Param() requestAzureOpenAiGptParamDto: RequestAzureOpenAiGptParamDto,
    @Body() requestAzureOpenAiGptDto: RequestAzureOpenAiGptDto,
  ) {
    return await this.chatService.requestAzureOpenAiGpt(
      requestAzureOpenAiGptParamDto,
      requestAzureOpenAiGptDto,
    );
  }

  @Get(':doctorIdx')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: '특정 사용자의 챗봇 Q&A 모두 불러오기',
    description: '특정 사용자의 챗봇 Q&A 데이터를 모두 불러옵니다.',
  })
  @ApiOkResponse({ description: '성공' })
  @ApiNotFoundResponse({ description: '실패' })
  @ApiInternalServerErrorResponse({ description: '실패' })
  async findAll(
    @Param() findAllChatsParamDto: FindAllChatsParamDto,
    @Query() findAllChatsQueryDto: FindAllChatsQueryDto,
  ) {
    return this.chatService.findAll(findAllChatsParamDto, findAllChatsQueryDto);
  }
}
