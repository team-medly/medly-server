import { Controller } from '@nestjs/common';
import { WithdrawalLogsService } from './withdrawalLogs.service';

@Controller('withdrawalLogs')
export class WithdrawalLogsController {
  constructor(private readonly withdrawalLogsService: WithdrawalLogsService) {}
}
