import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaService } from 'src/categoria/service/categoria.service';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateEntregaDto } from '../dto/create-entrega.dto';
import { UpdateEntregaDto } from '../dto/update-entrega.dto';
import { Entrega } from '../entities/entrega.entity';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private readonly entregaRepository: Repository<Entrega>,
  ) {}
  create(createEntregaDto: CreateEntregaDto) {    
    return this.entregaRepository.save(this.entregaRepository.create(createEntregaDto));
  }

  findAll() {
    return this.entregaRepository.find();
  }

  async findData(dataInit, dataFim): Promise<Entrega[]>{
    return this.entregaRepository.find(
      {
        data: Between(dataInit, dataFim)
      }
    );
  }

  findOne(id: number) {
    return this.entregaRepository.findOne(id);
  }

  update(id: number, updateEntregaDto: UpdateEntregaDto) {
    return this.entregaRepository.update(id, updateEntregaDto);
  }

  remove(id: number) {
    return this.entregaRepository.delete(id);
  }
}
