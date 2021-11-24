import { Module } from '@nestjs/common';
import { CategoriaService } from './service/categoria.service';
import { CategoriaController } from './controller/categoria.controller';
import { Categoria } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
