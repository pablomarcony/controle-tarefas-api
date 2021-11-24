import { Module } from '@nestjs/common';
import { LogExcelService } from './log-excel.service';
import { LogExcelController } from './log-excel.controller';

@Module({
  controllers: [LogExcelController],
  providers: [LogExcelService]
})
export class LogExcelModule {}
