import { PartialType } from '@nestjs/mapped-types';
import { CreateLogExcelDto } from './create-log-excel.dto';

export class UpdateLogExcelDto extends PartialType(CreateLogExcelDto) {}
