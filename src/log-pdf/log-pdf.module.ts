import { Module } from '@nestjs/common';
import { LogPdfService } from './service/log-pdf.service';
import { LogPdfController } from './controller/log-pdf.controller';

@Module({
  controllers: [LogPdfController],
  providers: [LogPdfService]
})
export class LogPdfModule {}
