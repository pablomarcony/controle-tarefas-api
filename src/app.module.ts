import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { CategoriaModule } from './categoria/categoria.module';
import { EntregaModule } from './entrega/entrega.module';
import { LogExcelModule } from './log-excel/log-excel.module';
import { LogPdfModule } from './log-pdf/log-pdf.module';
import { configService } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsuarioModule,
    CategoriaModule,
    EntregaModule,
    LogExcelModule,
    LogPdfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
