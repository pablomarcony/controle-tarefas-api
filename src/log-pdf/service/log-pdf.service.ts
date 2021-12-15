import { Injectable } from '@nestjs/common';
import { CreateLogPdfDto } from '../dto/create-log-pdf.dto';
import { UpdateLogPdfDto } from '../dto/update-log-pdf.dto';

@Injectable()
export class LogPdfService {
  create(createLogPdfDto: CreateLogPdfDto) {
    return 'This action adds a new logPdf';
  }

  findAll() {
    return `This action returns all logPdf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logPdf`;
  }

  update(id: number, updateLogPdfDto: UpdateLogPdfDto) {
    return `This action updates a #${id} logPdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} logPdf`;
  }
}
