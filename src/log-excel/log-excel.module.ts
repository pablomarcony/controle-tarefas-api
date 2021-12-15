import { Module } from '@nestjs/common';
import { LogExcelService } from './service/log-excel.service';
import { LogExcelController } from './controller/log-excel.controller';
import { LogExcel } from './entities/log-excel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogExcel]),
  ],
  controllers: [LogExcelController],
  providers: [LogExcelService],
  exports: [LogExcelService]
})
export class LogExcelModule {}
