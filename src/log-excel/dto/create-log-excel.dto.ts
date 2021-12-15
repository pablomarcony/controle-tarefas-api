import { Entrega } from "src/entrega/entities/entrega.entity";

export class CreateLogExcelDto {
        
    entrega: Entrega[];

    codigo: String;

    dataExportacao: Date;

}
