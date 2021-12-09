import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateEntregaDto } from './create-entrega.dto';

export class UpdateEntregaDto extends PartialType(CreateEntregaDto) {

    @ApiProperty()
    id?: number;

    @ApiProperty()
    projeto?: string;
    
    @ApiProperty()
    data?: Date;

    @ApiProperty()
    usuario?: Usuario;
    
    @ApiProperty()
    atividade?: string;

    @ApiProperty()
    categoria?: Categoria;
    
    @ApiProperty()
    tarefa?: string;
    
    @ApiProperty()
    comentario?: string;
    
    @ApiProperty()
    horas?: number;
    
    @ApiProperty()
    planejado?: boolean;
    
    @ApiProperty()
    produto?: string;
}
