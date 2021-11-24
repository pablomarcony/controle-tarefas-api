import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}