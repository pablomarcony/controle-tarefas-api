import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { EntregaService } from '../service/entrega.service';
import { CreateEntregaDto } from '../dto/create-entrega.dto';
import { UpdateEntregaDto } from '../dto/update-entrega.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogExcelService } from 'src/log-excel/service/log-excel.service';
import { CreateLogExcelDto } from 'src/log-excel/dto/create-log-excel.dto';
import * as Excel from 'exceljs';

@ApiTags('entrega')
@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService,
    private readonly usuarioService: UsuarioService,
    private readonly logExcelService: LogExcelService) {}

  @ApiBearerAuth('access_token')
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

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('data/:dataInit/:dataFim')
  async findData(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Req() req){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    return await this.entregaService.findData(dataInit, dataFim, usuario)
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('data/:dataInit/:dataFim/excel')
  async generateExcel(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Req() req, @Res() res){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    const entregas = await this.entregaService.findData(dataInit, dataFim, usuario);
    const createLogExcelDto = new CreateLogExcelDto;
    createLogExcelDto.entrega = entregas;
    const logExcel = await this.logExcelService.create(createLogExcelDto);
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet(usuario.nome.substring(0,5));
    var fileName = logExcel.codigo + '.xlsx';
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    sheet.columns = [
      { header: 'Projeto', key: 'projeto', width: 20, style: {alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }}},
      { header: 'Data', key: 'data', width: 20, style: {alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }}},
      { header: 'Usuário', key: 'usuario', width: 30, style: {alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }}},
      { header: 'Atividade', key: 'atividade', width: 20, style: {alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }}},
      { header: 'Categoria', key: 'categoria', width: 25, style: {alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }}},
      { header: 'Tarefa', key: 'tarefa', width: 32, style: {alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }}},
      { header: 'Comentário', key: 'comentario', width: 55, style: {alignment: { vertical: 'middle', horizontal: 'left', wrapText: true }}},
      { header: 'Horas', key: 'horas', width: 10, style: {alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }}},
      { header: 'Planejado?', key: 'planejado', width: 11, style: {alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }}},
      { header: 'Produto', key: 'produto', width: 25, style: {alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }}},
    ];
    sheet.getRow(1).font = {
      bold: true
    }
    sheet.getRow(1).fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFB1B1B1'}
    }
    sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' }
    entregas.forEach((e)=>{
      sheet.addRow({
        projeto: e.projeto,
        data: e.data,
        usuario: e.usuario.nome,
        atividade: e.atividade,
        categoria: e.categoria.descricao,
        tarefa: e.tarefa,
        comentario: e.comentario,
        horas: e.horas,
        planejado: e.planejado == true ? 'Sim' : 'Não',
        produto: e.produto
      });
    })
    await workbook.xlsx.write(res);
    res.end();
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
