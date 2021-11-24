import { BadRequestException, Injectable } from '@nestjs/common';
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
    createUsuarioDto.password = await bcrypt.hash(createUsuarioDto.password, saltOrRounds);
    const isMatch = await bcrypt.compare(createUsuarioDto.validatePassword, createUsuarioDto.password);
    if(!isMatch){
      throw new BadRequestException("Senhas não são iguais!")
    }
    const usuario = this.usuarioRepository.create(createUsuarioDto)
    return this.usuarioRepository.save(usuario);
  }

  async login(condition): Promise<Usuario>{
    return await this.usuarioRepository.findOne(condition)
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne(id);
  }

  async update(updateUsuarioDto: UpdateUsuarioDto) {
    if(updateUsuarioDto.password){
      const usuario = await this.findOne(updateUsuarioDto.id);
      const saltOrRounds = 12;
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, saltOrRounds);
      const isMatch = await bcrypt.compare(updateUsuarioDto.validatePassword, updateUsuarioDto.password);
      if(!isMatch){
        throw new BadRequestException("Senhas não são iguais!")
      }
      usuario.password = updateUsuarioDto.password;
      updateUsuarioDto = usuario;
    }
    return this.usuarioRepository.update(updateUsuarioDto.id, updateUsuarioDto);
  }

  remove(id: number) {
    return this.usuarioRepository.delete(id);
  }
}
