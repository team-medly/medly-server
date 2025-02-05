import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SelectAllChatUserHistoryDto {
  @ApiProperty({
    description: '의사 인덱스',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  doctorIdx: number;
}
