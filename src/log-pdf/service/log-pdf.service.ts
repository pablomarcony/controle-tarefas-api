import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLogPdfDto } from '../dto/create-log-pdf.dto';
import { UpdateLogPdfDto } from '../dto/update-log-pdf.dto';
import { LogPdf } from '../entities/log-pdf.entity';

@Injectable()
export class LogPdfService {
  constructor(
    @InjectRepository(LogPdf)
    private readonly logPdfRepository: Repository<LogPdf>,
  ) {}
  async create(createLogPdfDto: CreateLogPdfDto) {
    createLogPdfDto.dataExportacao = new Date();
    createLogPdfDto.codigo = `${createLogPdfDto.entrega[0].usuario.nome.substring(0,2).toUpperCase()}${String(createLogPdfDto.dataExportacao.getFullYear())}-${String(createLogPdfDto.dataExportacao.getMonth() + 1)}-${String(createLogPdfDto.dataExportacao.getDate())}`;
    return await this.logPdfRepository.save(this.logPdfRepository.create(createLogPdfDto));;
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
