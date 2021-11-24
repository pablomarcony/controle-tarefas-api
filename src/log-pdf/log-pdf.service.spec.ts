import { Test, TestingModule } from '@nestjs/testing';
import { LogPdfService } from './log-pdf.service';

describe('LogPdfService', () => {
  let service: LogPdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogPdfService],
    }).compile();

    service = module.get<LogPdfService>(LogPdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
