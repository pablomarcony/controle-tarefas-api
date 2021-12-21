import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { EntregaService } from '../service/entrega.service';
import { CreateEntregaDto } from '../dto/create-entrega.dto';
import { UpdateEntregaDto } from '../dto/update-entrega.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsuarioService } from 'src/usuario/service/usuario.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogExcelService } from 'src/log-excel/service/log-excel.service';
import { CreateLogExcelDto } from 'src/log-excel/dto/create-log-excel.dto';
import * as Excel from 'exceljs';
import { CreateLogPdfDto } from 'src/log-pdf/dto/create-log-pdf.dto';
import * as fs from 'fs';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';

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

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.entregaService.findAll();
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  //Rota para Supervisor
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('super/:dataInit/:dataFim/:usuarioId')
  async findDataSupervisor(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Param('usuarioId') usuarioId: number, @Req() req){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    if(usuario.perfil == "INDRA" || usuario.perfil == "SEATI") {
      throw new UnauthorizedException("Usuário não possui permissão");
    } 
    const user = await this.usuarioService.findOne(usuarioId);
    if(!user){
      throw new BadRequestException("Nenhum usuário com este id foi encontrado.")
    }
    return await this.entregaService.findData(dataInit, dataFim, user)    
  }

  //Rota para Supervisor
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('super/:dataInit/:dataFim/:usuarioId/excel')
  async generateExcelSupervisor(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Param('usuarioId') usuarioId: number, @Req() req, @Res() res){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    if(usuario.perfil == "INDRA" || usuario.perfil == "SEATI") {
      throw new UnauthorizedException("Usuário não possui permissão");
    }
    const user = await this.usuarioService.findOne(usuarioId);
    if(!user){
      throw new BadRequestException("Nenhum usuário com este id foi encontrado.")
    }
    const entregas = await this.entregaService.findData(dataInit, dataFim, user);
    const createLogExcelDto = new CreateLogExcelDto;
    createLogExcelDto.entrega = entregas;
    const logExcel = await this.logExcelService.create(createLogExcelDto);
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet(usuario.nome.split(" ", 2)[0]);
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

  //Rota para Supervisor
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('super/:dataInit/:dataFim/:usuarioId/pdf')
  async generatePdfSupervisor(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Param('usuarioId') usuarioId: number, @Req() req, @Res() res){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    if(usuario.perfil == "INDRA" || usuario.perfil == "SEATI") {
      throw new UnauthorizedException("Usuário não possui permissão");
    }
    const user = await this.usuarioService.findOne(usuarioId);
    if(!user){
      throw new BadRequestException("Nenhum usuário com este id foi encontrado.")
    }
    const entregas = await this.entregaService.findData(dataInit, dataFim, user);
    const createLogPdfDto = new CreateLogPdfDto;
    createLogPdfDto.entrega = entregas;
    const logPdf = await this.logExcelService.create(createLogPdfDto);   
    var fileName = logPdf.codigo + '.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    const options = {
      "format": 'A4',
      "quality": "20",
      "type": "pdf",
      "timeout": 540000
    };
    var file = "./src/entrega/pdf/html.ejs";

    var html = await ejs.render(fs.readFileSync(file, 'utf8'), { 'locals': entregas });
    
    return await pdf.create(html, options).toStream((err, stream) => {
        return stream.pipe(res);
    });
  }

  //Rota para Usuário Logado
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('data/:dataInit/:dataFim')
  async findData(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Req() req){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    return await this.entregaService.findData(dataInit, dataFim, usuario)
  }

  //Rota para Usuário Logado
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
    const sheet = workbook.addWorksheet(usuario.nome.split(" ", 2)[0]);
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

  //Rota para Usuário Logado
  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Get('data/:dataInit/:dataFim/pdf')
  async generatePdf(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date, @Req() req, @Res() res){
    const usuario = await this.usuarioService.findOne(req.user.userId);
    const entregas = await this.entregaService.findData(dataInit, dataFim, usuario);
    const createLogPdfDto = new CreateLogPdfDto;
    createLogPdfDto.entrega = entregas;
    const logPdf = await this.logExcelService.create(createLogPdfDto);   
    var fileName = logPdf.codigo + '.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader("Content-Disposition", "attachment; filename=" + fileName);
    const options = {
      "format": 'A4',
      "quality": "20",
      "type": "pdf",
      "timeout": 540000
    };
    var file = "./src/entrega/pdf/html.ejs";

    var html = await ejs.render(fs.readFileSync(file, 'utf8'), { 'locals': entregas });
    
    return await pdf.create(html, options).toStream((err, stream) => {
        return stream.pipe(res);
    });
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateEntregaDto: UpdateEntregaDto) {
    return this.entregaService.update(+id, updateEntregaDto);
  }

  @ApiBearerAuth('access_token')
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.entregaService.remove(+id);
  }
}
