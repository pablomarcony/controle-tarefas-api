import { Test, TestingModule } from '@nestjs/testing';
import { LogExcelService } from './log-excel.service';

describe('LogExcelService', () => {
  let service: LogExcelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogExcelService],
    }).compile();

    service = module.get<LogExcelService>(LogExcelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
