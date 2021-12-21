import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogPdfService } from '../service/log-pdf.service';
import { CreateLogPdfDto } from '../dto/create-log-pdf.dto';
import { UpdateLogPdfDto } from '../dto/update-log-pdf.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('log-pdf')
@Controller('log-pdf')
export class LogPdfController {
  constructor(private readonly logPdfService: LogPdfService) {}

  @Post()
  create(@Body() createLogPdfDto: CreateLogPdfDto) {
    return this.logPdfService.create(createLogPdfDto);
  }

  @Get()
  findAll() {
    return this.logPdfService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logPdfService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogPdfDto: UpdateLogPdfDto) {
    return this.logPdfService.update(+id, updateLogPdfDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logPdfService.remove(+id);
  }
}
