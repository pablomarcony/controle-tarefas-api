import { Module } from '@nestjs/common';
import { LogPdfService } from './log-pdf.service';
import { LogPdfController } from './log-pdf.controller';

@Module({
  controllers: [LogPdfController],
  providers: [LogPdfService]
})
export class LogPdfModule {}
