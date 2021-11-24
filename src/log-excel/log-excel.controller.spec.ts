import { Test, TestingModule } from '@nestjs/testing';
import { LogExcelController } from './log-excel.controller';
import { LogExcelService } from './log-excel.service';

describe('LogExcelController', () => {
  let controller: LogExcelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogExcelController],
      providers: [LogExcelService],
    }).compile();

    controller = module.get<LogExcelController>(LogExcelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
