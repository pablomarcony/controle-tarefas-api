import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EntregaService } from '../service/entrega.service';
import { CreateEntregaDto } from '../dto/create-entrega.dto';
import { UpdateEntregaDto } from '../dto/update-entrega.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('entrega')
@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService,
    private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createEntregaDto: CreateEntregaDto, @Req() req) {
    const usuario = await this.usuarioService.findOne(req.user.userId);
    delete usuario.password;
    createEntregaDto.usuario = usuario;
    return this.entregaService.create(createEntregaDto);
  }

  @Get()
  findAll() {
    return this.entregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('data/:dataInit/:dataFim')
  async findData(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Req() req){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    return await this.entregaService.findData(dataInit, dataFim, usuario)
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateEntregaDto: UpdateEntregaDto) {
    return this.entregaService.update(+id, updateEntregaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.entregaService.remove(+id);
  }
}
