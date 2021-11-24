import { Injectable } from '@nestjs/common';
import { CreateLogExcelDto } from './dto/create-log-excel.dto';
import { UpdateLogExcelDto } from './dto/update-log-excel.dto';

@Injectable()
export class LogExcelService {
  create(createLogExcelDto: CreateLogExcelDto) {
    return 'This action adds a new logExcel';
  }

  findAll() {
    return `This action returns all logExcel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logExcel`;
  }

  update(id: number, updateLogExcelDto: UpdateLogExcelDto) {
    return `This action updates a #${id} logExcel`;
  }

  remove(id: number) {
    return `This action removes a #${id} logExcel`;
  }
}
