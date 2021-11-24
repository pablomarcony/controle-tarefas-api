import { ApiProperty } from "@nestjs/swagger";
import { Perfil } from "../entities/usuario.entity";

export class CreateUsuarioDto {
    @ApiProperty()
    nome: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    validatePassword: string;

    @ApiProperty()
    perfil: Perfil;
}
