import { Test, TestingModule } from '@nestjs/testing';
import { LogPdfController } from './log-pdf.controller';
import { LogPdfService } from './log-pdf.service';

describe('LogPdfController', () => {
  let controller: LogPdfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogPdfController],
      providers: [LogPdfService],
    }).compile();

    controller = module.get<LogPdfController>(LogPdfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
