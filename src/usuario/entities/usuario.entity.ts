import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';


export enum Perfil {
    SEATI = "SEATI",
    INDRA = "INDRA",
}
@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @MinLength(6)
    password: string;

    @Column({
        type: "enum",
        enum: Perfil
    })
    perfil: Perfil;

}
