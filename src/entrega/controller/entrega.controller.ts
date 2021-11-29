import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers } from '@nestjs/common';
import { EntregaService } from '../service/entrega.service';
import { CreateEntregaDto } from '../dto/create-entrega.dto';
import { UpdateEntregaDto } from '../dto/update-entrega.dto';
import { AuthService } from 'src/auth/service/auth.service';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly entregaService: EntregaService,
    private authService: AuthService) {}

  @Post()
  create(@Headers() headers, @Body() createEntregaDto: CreateEntregaDto) {
    console.log(headers.authentication);
    this.authService.deconde(headers.authentication);
    return null;
  }

  @Get()
  findAll() {
    return this.entregaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregaService.findOne(+id);
  }

  @Get('data')
  findData(@Param('dataInit') dataInit: Date, @Param('dataFim') dataFim: Date){
    
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
