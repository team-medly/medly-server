import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class FindAllChatsParamDto {
  @ApiProperty({
    description: '의사 인덱스',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  doctorIdx: number;
}

export class FindAllChatsQueryDto {
  @ApiProperty({
    description: '챗봇 모델명',
    example: '문헌 검색',
    required: false,
  })
  @IsOptional()
  @IsIn(['문헌 검색', 'FAQ', '의료 지식 A', '의료 지식 B'])
  model: string;
}
