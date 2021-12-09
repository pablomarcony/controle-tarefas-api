import { ApiProperty } from "@nestjs/swagger";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateEntregaDto {
    
    @ApiProperty()
    projeto: string;
    
    @ApiProperty()
    data: Date;

    @ApiProperty()
    usuario: Usuario;
    
    @ApiProperty()
    atividade: string;

    @ApiProperty()
    categoria: Categoria;
    
    @ApiProperty()
    tarefa: string;
    
    @ApiProperty()
    comentario: string;
    
    @ApiProperty()
    horas: number;
    
    @ApiProperty()
    planejado: boolean;
    
    @ApiProperty()
    produto: string;
}
