import { PartialType } from '@nestjs/swagger';
import { CreateChatUserHistoryDto } from './createChatUserHistories.dto';

export class UpdateChatUserHistoryDto extends PartialType(
  CreateChatUserHistoryDto,
) {}
