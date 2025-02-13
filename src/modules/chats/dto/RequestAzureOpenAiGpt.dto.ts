import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequestAzureOpenAiGptDto {
  @ApiProperty({
    description: '',
    example: '',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  messages: string;
}

export class RequestAzureOpenAiGptParamDto {
  @ApiProperty({
    description: '',
    example: '',
    required: true,
  })
  @IsNotEmpty()
  doctorIdx: number;
}
