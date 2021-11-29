import { PartialType } from '@nestjs/mapped-types';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateEntregaDto } from './create-entrega.dto';

export class UpdateEntregaDto extends PartialType(CreateEntregaDto) {
    id?: number;

    projeto?: string;
    
    data?: Date;

    usuario?: Usuario;
    
    atividade?: string;

    categoria?: Categoria;
    
    tarefa?: string;
    
    comentario?: string;
    
    horas?: number;
    
    planejado?: boolean;
    
    produto?: string;
}
