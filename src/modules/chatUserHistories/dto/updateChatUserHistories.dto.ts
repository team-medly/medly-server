import { PartialType } from '@nestjs/swagger';
import { InsertOneChatUserHistoryDto } from './insertOneChatUserHistories.dto';

export class UpdateChatUserHistoryDto extends PartialType(
  InsertOneChatUserHistoryDto,
) {}
