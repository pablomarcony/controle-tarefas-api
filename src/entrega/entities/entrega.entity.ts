import { Categoria } from "src/categoria/entities/categoria.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Entrega {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    projeto: string;

    @Column()
    data: Date;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @Column()
    atividade: string;

    @ManyToOne(() => Categoria)
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    @Column()
    tarefa: string;

    @Column()
    comentario: string;

    @Column()
    horas: number;

    @Column()
    planejado: boolean;

    @Column()
    produto: string;

}

/*
Id - Long
Projeto - String
Data - Date
Usuário - User
Atividade - String
Categoria - Categoria
Tarefa - String
Comentário - String
Horas trabalhadas - Int
Planejado - Boolean
Produto - String
*/
