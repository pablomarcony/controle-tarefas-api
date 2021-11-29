import { ApiProperty } from "@nestjs/swagger";

export class UsuarioLoginDto {
    
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

}
