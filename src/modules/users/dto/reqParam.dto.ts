import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteUserByIdxParam {
  @ApiProperty({
    description: '유저 인덱스',
    example: 1,
  })
  @IsNotEmpty()
  userIdx: number;
}
