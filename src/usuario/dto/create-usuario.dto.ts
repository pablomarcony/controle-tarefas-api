import { Perfil } from "../entities/usuario.entity";

export class CreateUsuarioDto {
    nome: string;
    email: string;
    password: string;
    validatePassword: string;
    perfil: Perfil;
}
