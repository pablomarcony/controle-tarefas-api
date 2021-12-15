import { forwardRef, Module } from '@nestjs/common';
import { EntregaService } from './service/entrega.service';
import { EntregaController } from './controller/entrega.controller';
import { Entrega } from './entities/entrega.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LogExcelModule } from 'src/log-excel/log-excel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entrega]),
    UsuarioModule,
    LogExcelModule],
  controllers: [EntregaController],
  providers: [EntregaService],
  exports: [EntregaService]
})
export class EntregaModule {}
