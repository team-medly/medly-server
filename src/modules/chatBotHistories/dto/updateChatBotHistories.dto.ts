import { PartialType } from '@nestjs/swagger';
import { CreateChatBotHistoryDto } from './createChatBotHistories.dto';

export class UpdateChatBotHistoryDto extends PartialType(CreateChatBotHistoryDto) {}
