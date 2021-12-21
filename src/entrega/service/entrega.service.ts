import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaService } from 'src/categoria/service/categoria.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { Between, Equal, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
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
    return this.entregaRepository.find({relations: ["usuario", "categoria"]});
  }

  async findData(dataInit: Date, dataFim: Date, usuario: Usuario) : Promise<Entrega[]>{
    const ent = await this.entregaRepository.createQueryBuilder('entrega').leftJoinAndSelect('entrega.usuario', 'usuario').leftJoinAndSelect('entrega.categoria', 'categoria')
    .where(`entrega.data >= '${dataInit}'`).andWhere(`entrega.data <= '${dataFim}'`).andWhere(`entrega.usuario_id = ${usuario.id}`).orderBy('entrega.data').getMany();
    ent.forEach(e=>{
      delete e.usuario.password;
    });
    return ent;
  }

  findOne(id: number) {
    return this.entregaRepository.findOne(id, {relations: ["usuario", "categoria"]});
  }

  update(id: number, updateEntregaDto: UpdateEntregaDto) {
    return this.entregaRepository.update(id, updateEntregaDto);
  }

  remove(id: number) {
    return this.entregaRepository.delete(id);
  }
}
