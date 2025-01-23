import { Controller, Delete, Param, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { DeleteUserByIdxParam } from './dto/reqParam.dto';
import { DeleteUserByIdxQuery } from './dto/reqQuery.dto';

@ApiTags('유저 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete('/:userIdx')
  @ApiOperation({
    summary: '유저 삭제 API',
    description: '유저의 deletedAt 필드를 업데이트한다',
  })
  @ApiOkResponse({
    description: 'DB 삭제 성공',
  })
  @ApiNotFoundResponse({ description: 'DB가 존재하지 않음' })
  @ApiInternalServerErrorResponse({
    description: '서버가 이해하지 못한 케이스',
  })
  async deleteUserByIdx(
    @Param() param: DeleteUserByIdxParam,
    @Query() query: DeleteUserByIdxQuery,
  ) {
    const { userIdx } = param;
    const { reason } = query;

    return await this.usersService.deleteUserByIdx(userIdx, reason);
  }
}
