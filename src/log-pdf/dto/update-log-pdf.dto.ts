import { PartialType } from '@nestjs/mapped-types';
import { CreateLogPdfDto } from './create-log-pdf.dto';

export class UpdateLogPdfDto extends PartialType(CreateLogPdfDto) {}
