import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req  } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { AuthService } from 'src/auth/service/auth.service';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsuarioLoginDto } from '../dto/usuario-login.dto';

@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() usuarioLoginDto: UsuarioLoginDto) {
    const usuario = await this.authService.validateUser(usuarioLoginDto.email, usuarioLoginDto.password);
    return await this.authService.login(usuario);  
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(+id);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioService.findOne(id);
    if(!usuario){
      throw new BadRequestException("Usuário não encontrado.")
    }
    return this.usuarioService.update(updateUsuarioDto);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch('perfil')
  async updatePerfil(@Req() req, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioService.findOne(req.user.userId);
    if(!usuario){
      throw new BadRequestException("Usuário não encontrado.")
    }
    return this.usuarioService.update(updateUsuarioDto);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  updatePassword(@Body() updateUsuarioDto: UpdateUsuarioDto){
    return this.usuarioService.update(updateUsuarioDto);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(+id);
  }
}
