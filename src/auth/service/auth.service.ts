import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsuarioService } from 'src/usuario/service/usuario.service';

@Injectable()
export class AuthService {
    user: any = {};

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        this.user = await this.usuarioService.login({email});

        if(!this.user){
            throw new BadRequestException('Email inválido!');
        }
        if(!await bcrypt.compare(password, this.user.password)){
            throw new BadRequestException('Senha inválida!');
        }

        return await this.user;
    }
    
    async login(user: any) {
        const payload = { nome: user.nome, sub: user.id };
        return {
            access_token: this.jwtService.signAsync(payload),
        };
    }

    async deconde(token){
        this.jwtService.decode(token);
    }
}
