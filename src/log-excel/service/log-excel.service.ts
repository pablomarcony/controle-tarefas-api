import { Injectable } from '@nestjs/common';
import { CreateLogExcelDto } from '../dto/create-log-excel.dto';
import { UpdateLogExcelDto } from '../dto/update-log-excel.dto';
import { LogExcel } from '../entities/log-excel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Entrega } from 'src/entrega/entities/entrega.entity';

@Injectable()
export class LogExcelService {
  constructor(
    @InjectRepository(LogExcel)
    private readonly logExcelRepository: Repository<LogExcel>,
  ) {}
  async create(createLogExcelDto: CreateLogExcelDto) {
    createLogExcelDto.dataExportacao = new Date();
    createLogExcelDto.codigo = `${createLogExcelDto.entrega[0].usuario.nome.substring(0,2).toUpperCase()}${String(createLogExcelDto.dataExportacao.getFullYear())}-${String(createLogExcelDto.dataExportacao.getMonth() + 1)}-${String(createLogExcelDto.dataExportacao.getDate())}`;
    return await this.logExcelRepository.save(this.logExcelRepository.create(createLogExcelDto));
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
