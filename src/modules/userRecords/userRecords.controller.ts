import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserRecordsService } from './userRecords.service';
import { AddUserRecordBody } from './dto/reqBody.dto';
import { AddUserRecordParam } from './dto/reqParam.dto';
import { GetPatientListReqQueryDto } from './dto/reqQuery.dto';
import { GetPatientListResDto } from './dto/resBody.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('유저 수술 기록 API')
@Controller('userRecords')
@UseGuards(JwtAuthGuard)
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

  @Get()
  @ApiOperation({ summary: '환자 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '환자 목록 조회 성공',
    type: GetPatientListResDto,
  })
  async getPatientList(
    @Query() query: GetPatientListReqQueryDto,
  ): Promise<GetPatientListResDto> {
    return this.userRecordsService.getPatientList(query);
  }
}
