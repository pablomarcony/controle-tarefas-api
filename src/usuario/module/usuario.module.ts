import { Module } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioController } from '../controller/usuario.controller';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
