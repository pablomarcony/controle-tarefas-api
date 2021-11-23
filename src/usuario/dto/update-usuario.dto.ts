import { PartialType } from '@nestjs/mapped-types';
import { Perfil } from '../entities/usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    id?:number;
    nome?: string;
    email?: string;
    perfil?: Perfil;
    password?: string;
    validatePassword?: string;
}
