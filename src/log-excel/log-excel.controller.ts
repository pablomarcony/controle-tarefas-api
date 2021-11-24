import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogExcelService } from './log-excel.service';
import { CreateLogExcelDto } from './dto/create-log-excel.dto';
import { UpdateLogExcelDto } from './dto/update-log-excel.dto';

@Controller('log-excel')
export class LogExcelController {
  constructor(private readonly logExcelService: LogExcelService) {}

  @Post()
  create(@Body() createLogExcelDto: CreateLogExcelDto) {
    return this.logExcelService.create(createLogExcelDto);
  }

  @Get()
  findAll() {
    return this.logExcelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logExcelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogExcelDto: UpdateLogExcelDto) {
    return this.logExcelService.update(+id, updateLogExcelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logExcelService.remove(+id);
  }
}
