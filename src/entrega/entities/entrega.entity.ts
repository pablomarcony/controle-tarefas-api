import { Categoria } from "src/categoria/entities/categoria.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Entrega {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    projeto: string;

    @Column({nullable: false})
    data: Date;

    @ManyToOne(() => Usuario, {nullable: false})
    @JoinColumn({ name: "usuario_id" })
    usuario: Usuario;

    @Column({nullable: false})
    atividade: string;

    @ManyToOne(() => Categoria, {nullable: false})
    @JoinColumn({ name: "categoria_id" })
    categoria: Categoria;

    @Column({nullable: false})
    tarefa: string;

    @Column({nullable: false})
    comentario: string;

    @Column({nullable: false})
    horas: number;

    @Column({nullable: false})
    planejado: boolean;

    @Column({nullable: false})
    produto: string;

}
