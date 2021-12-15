import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EntregaService } from '../service/entrega.service';
import { CreateEntregaDto } from '../dto/create-entrega.dto';
import { UpdateEntregaDto } from '../dto/update-entrega.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { ApiTags } from '@nestjs/swagger';
import { LogExcelService } from 'src/log-excel/service/log-excel.service';
import { CreateLogExcelDto } from 'src/log-excel/dto/create-log-excel.dto';
import * as Excel from 'exceljs';

@ApiTags('entrega')
@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService,
    private readonly usuarioService: UsuarioService,
    private readonly logExcelService: LogExcelService) {}

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

  @UseGuards(JwtAuthGuard)
  @Get('data/:dataInit/:dataFim/excel')
  async generateExcel(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Req() req){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    const entregas = await this.entregaService.findData(dataInit, dataFim, usuario);
    const createLogExcelDto = new CreateLogExcelDto;
    createLogExcelDto.entrega = entregas;
    const logExcel = await this.logExcelService.create(createLogExcelDto);
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet(usuario.nome.substring(0,5));
    sheet.columns = [
      { header: 'Projeto', key: 'projeto' },
      { header: 'Data', key: 'data' },
      { header: 'Usuário', key: 'usuario' },
      { header: 'Atividade', key: 'atividade' },
      { header: 'Categoria', key: 'categoria' },
      { header: 'Tarefa', key: 'tarefa' },
      { header: 'Comentário', key: 'comentario' },
      { header: 'Horas', key: 'horas' },
      { header: 'Planejado?', key: 'planejado' },
      { header: 'Produto', key: 'produto' },
    ];
    sheet.addRows(entregas);
    return await workbook.xlsx.writeFile('../../../teste.xlsx');
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
