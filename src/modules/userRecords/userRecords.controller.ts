import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { UserRecordsService } from './userRecords.service';
import { AddUserRecordBody } from './dto/reqBody.dto';
import { AddUserRecordParam } from './dto/reqParam.dto';

@ApiTags('유저 수술 기록 API')
@Controller('userRecords')
export class UserRecordsController {
  constructor(private readonly userRecordsService: UserRecordsService) {}

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
    @Param() param: AddUserRecordParam,
    @Body() body: AddUserRecordBody,
  ) {
    const { userIdx } = param;
    const { nameOfSurgery, surgeryRecord } = body;

    return await this.userRecordsService.addUserLog(
      userIdx,
      nameOfSurgery,
      surgeryRecord,
    );
  }
}
