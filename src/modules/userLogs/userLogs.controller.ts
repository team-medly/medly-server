import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UserLogsService } from './userLogs.service';
import { AddUserLogBody } from './dto/reqBody.dto';
import { AddUserLogParam } from './dto/reqParam.dto';

@ApiTags('유저 수술 기록 API')
@Controller('userLogs')
export class UserLogsController {
  constructor(private readonly userLogsService: UserLogsService) {}

  @Post('/addRecord/:userIdx')
  @ApiOperation({
    summary: '유저 수술 기록 생성 API',
    description: '유저 수술 기록 생성',
  })
  @ApiCreatedResponse({ description: 'DB 추가 성공' })
  @ApiInternalServerErrorResponse({
    description: '서버가 이해하지 못한 케이스',
  })
  async addUserLog(
    @Param() param: AddUserLogParam,
    @Body() body: AddUserLogBody,
  ) {
    const { userIdx } = param;
    const { nameOfSurgery, surgeryRecord } = body;

    return await this.userLogsService.addUserLog(
      userIdx,
      nameOfSurgery,
      surgeryRecord,
    );
  }
}
