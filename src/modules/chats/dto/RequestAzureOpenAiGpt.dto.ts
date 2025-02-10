import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RequestAzureOpenAiGptDto {
  @ApiProperty({
    description: '',
    example: '',
    required: true,
  })
  @IsNotEmpty()
  messages: string;
}
