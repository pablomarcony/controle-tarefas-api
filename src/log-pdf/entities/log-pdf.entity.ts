import { Entrega } from "src/entrega/entities/entrega.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class LogPdf {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Entrega)
    @JoinTable(
        {
          name: "log_pdf_has_entrega",
          joinColumn: { name: "log_pdf_id" },
          inverseJoinColumn: { name: "entrega_id" }
        })
    entrega: Entrega[];

    @Column()
    codigo: String;

    @Column()
    exportacao: Date;

}
