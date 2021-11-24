import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoriaDto {
    @ApiProperty()
    descricao: string;
}
