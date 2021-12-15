import { Module } from '@nestjs/common';
import { LogPdfService } from './service/log-pdf.service';
import { LogPdfController } from './controller/log-pdf.controller';
import { LogPdf } from './entities/log-pdf.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([LogPdf]),
  ],
  controllers: [LogPdfController],
  providers: [LogPdfService],
  exports: [LogPdfService]
})
export class LogPdfModule {}
