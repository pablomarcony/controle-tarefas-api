import { Categoria } from "src/categoria/entities/categoria.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateEntregaDto {
    
    projeto: string;
    
    data: Date;

    usuario: Usuario;
    
    atividade: string;

    categoria: Categoria;
    
    tarefa: string;
    
    comentario: string;
    
    horas: number;
    
    planejado: boolean;
    
    produto: string;
}
