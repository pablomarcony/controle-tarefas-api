import { Entrega } from "src/entrega/entities/entrega.entity";

export class CreateLogPdfDto {

    entrega: Entrega[];

    codigo: String;
    
    dataExportacao: Date;

}
