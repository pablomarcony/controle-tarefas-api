import { ApiProperty } from "@nestjs/swagger";

export class UsuarioLoginDto {
    
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly password: string;

}
