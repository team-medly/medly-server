import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { RequestAzureOpenAiGptDto } from './dto/RequestAzureOpenAiGpt.dto';

@ApiTags('챗봇 API')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatService: ChatsService) {}

  @Post()
  @ApiOperation({
    summary: 'Azure OpenAI GPT 모델에 요청',
    description: 'Azure OpenAI GPT 모델에 요청',
  })
  @ApiOkResponse({ description: '성공' })
  @ApiNotFoundResponse({ description: '실패' })
  @ApiInternalServerErrorResponse({ description: '실패' })
  async requestAzureOpenAiGpt(
    @Body() requestAzureOpenAiGptDto: RequestAzureOpenAiGptDto,
  ) {
    return await this.chatService.requestAzureOpenAiGpt(
      requestAzureOpenAiGptDto,
    );
  }
}
