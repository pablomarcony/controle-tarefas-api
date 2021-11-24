import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Perfil } from '../entities/usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty()
    id?:number;

    @ApiProperty()
    nome?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    perfil?: Perfil;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    validatePassword?: string;
}
