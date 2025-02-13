import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ChatUserHistoriesEntity } from '../chatUserHistories/entities/chatUserHistories.entity';
import { ChatBotHistoriesEntity } from '../chatBotHistories/entities/chatBotHistories.entity';
import { AzureOpenAI } from 'openai';
import type { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/index';
import { handlingError } from 'src/common/utils/handlingError';
import { ChatUserHistoriesService } from '../chatUserHistories/chatUserHistories.service';
import { ChatBotHistoriesService } from '../chatBotHistories/chatBotHistories.service';
import { RequestAzureOpenAiGptDto } from './dto/RequestAzureOpenAiGpt.dto';

@Injectable()
export class ChatsService {
  constructor(
    private dataSource: DataSource,
    private chatUserHistoriesService: ChatUserHistoriesService,
    private chatBotHistoriesService: ChatBotHistoriesService,
  ) {}

  createMessage(): ChatCompletionCreateParamsNonStreaming {
    return {
      messages: [
        { role: 'system', content: '' },
        { role: 'user', content: '' },
      ],
      model: '', // model == deployment name
    };
  }

  async requestAzureOpenAiGpt(
    requestAzureOpenAiGptDto: RequestAzureOpenAiGptDto,
  ) {
    const endpoint = process.env['AZURE_OPENAI_ENDPOINT'];
    const apiKey = process.env['AZURE_OPENAI_API_KEY'];

    const apiVersion = '2024-12-01-preview';
    const deploymentName = 'o3-mini-2025-01-31';

    const messages = requestAzureOpenAiGptDto.messages;

    try {
      const client = new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment: deploymentName,
      });

      const response = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: '사용자에게 도움을 주는 AI 도우미입니다.',
          },
          { role: 'user', content: messages },
        ],
        model: deploymentName,
      });

      const query = await this.chatUserHistoriesService.createOne({
        query: messages,
        doctorIdx: 1,
      });

      const answer = this.chatBotHistoriesService.createOne({
        answer: response.choices[0].message.content,
        queryIdx: query.idx,
      });

      return (({ choices, model, usage }) => ({ choices, model, usage }))(
        response,
      );
    } catch (err) {
      console.log(err);
      handlingError(err);
    }
  }
}
