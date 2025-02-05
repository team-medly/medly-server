import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class InsertOneChatBotHistoryDto {
  @ApiProperty({
    description: '챗봇 답변 문자열',
    example: '안녕하세요, 무엇을 도와드릴까요?',
    required: true,
  })
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    description: '사용자 쿼리 인덱스',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  queryIdx: number;
}
