import { Injectable } from '@nestjs/common';
import { AzureOpenAI } from 'openai';
import '@azure/openai/types';
import { handlingError } from 'src/common/utils/handlingError';
import { ChatUserHistoriesService } from '../chatUserHistories/chatUserHistories.service';
import { ChatBotHistoriesService } from '../chatBotHistories/chatBotHistories.service';
import {
  RequestAzureOpenAiGptDto,
  RequestAzureOpenAiGptParamDto,
} from './dto/RequestAzureOpenAiGpt.dto';
import {
  FindAllChatsParamDto,
  FindAllChatsQueryDto,
} from './dto/FindAllChats.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatUserHistoriesEntity } from '../chatUserHistories/entities/chatUserHistories.entity';
import { Repository } from 'typeorm';
import { DoctorsEntity } from '../doctors/entities/doctor.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(ChatUserHistoriesEntity)
    private chatUserHistoriesRepository: Repository<ChatUserHistoriesEntity>,
    private chatUserHistoriesService: ChatUserHistoriesService,
    private chatBotHistoriesService: ChatBotHistoriesService,
  ) {}

  // createMessage(): ChatCompletionCreateParamsNonStreaming {
  //   return {
  //     messages: [
  //       { role: 'system', content: '' },
  //       { role: 'user', content: '' },
  //     ],
  //     model: '', // model == deployment name
  //   };
  // }

  async requestAzureOpenAiGpt(
    requestAzureOpenAiGptParamDto: RequestAzureOpenAiGptParamDto,
    requestAzureOpenAiGptDto: RequestAzureOpenAiGptDto,
  ) {
    const endpoint = process.env['AZURE_OPENAI_ENDPOINT'];
    const apiKey = process.env['AZURE_OPENAI_API_KEY'];

    const apiVersion = '2024-12-01-preview';
    const deploymentName = 'gpt-4o-doc-search';

    const messages = requestAzureOpenAiGptDto.messages;

    try {
      const client = new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment: deploymentName,
      });

      const response = await client.chat.completions.create({
        // stream: true,
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
        doctorIdx: requestAzureOpenAiGptParamDto.doctorIdx,
      });

      this.chatBotHistoriesService.createOne({
        answer: response.choices[0].message.content,
        queryIdx: query.idx,
      });

      // response 프로퍼티 중 stream: true로 설정했을 때 사용
      // let result = '';
      // for await (const event of response) {
      //   console.log(event.choices);
      //   for (const choice of event.choices) {
      //     const newText = choice.delta?.content;
      //     if (newText) {
      //       result += newText;
      //       // To see streaming results as they arrive, uncomment line below
      //       // console.log(newText);
      //     }
      //   }
      // }

      return (({ choices, model, usage }) => ({ choices, model, usage }))(
        response,
      );
    } catch (err) {
      console.log(err);
      handlingError(err);
    }
  }

  async findAll(
    findAllChatsParamDto: FindAllChatsParamDto,
    findAllChatsQueryDto: FindAllChatsQueryDto,
  ) {
    const doctor = new DoctorsEntity();
    doctor.idx = findAllChatsParamDto.doctorIdx;
    const histories = this.chatUserHistoriesRepository.find({
      where: {
        model: findAllChatsQueryDto.model,
        doctor: doctor,
      },
      order: {
        createdAt: 'ASC',
      },
      relations: {
        chatBotHistory: true,
      },
    });
    return (await histories).map((history) => ({
      query: history.query,
      answer: history.chatBotHistory?.answer || null,
    }));
  }
}
