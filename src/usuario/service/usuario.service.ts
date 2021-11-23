import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  
  async create(createUsuarioDto: CreateUsuarioDto) {
    const saltOrRounds = 12;
    const hash = await bcrypt.hash(createUsuarioDto.password, saltOrRounds);
    const isMatch = await bcrypt.compare(createUsuarioDto.validatePassword, hash);
    if(!isMatch){
      return "Senhas não são iguais!"
    }
    createUsuarioDto.password = hash;
    const usuario = this.usuarioRepository.create(createUsuarioDto)
    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne(id);
  }

  update(updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a  usuario`;
  }

  remove(id: number) {
    return this.usuarioRepository.delete(id);
  }
}
