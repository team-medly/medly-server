import { PartialType } from '@nestjs/swagger';
import { InsertOneChatBotHistoryDto } from './insertOneChatBotHistories.dto';

export class UpdateChatBotHistoryDto extends PartialType(
  InsertOneChatBotHistoryDto,
) {}
