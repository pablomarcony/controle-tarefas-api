import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Controle Tarefas API')
    .setDescription('Controle Tarefas API')
    .setVersion('1.0')
    .addTag('usuario')
    .addBearerAuth({ type: 'http', bearerFormat: 'JWT', name: 'Authorization', scheme: 'Bearer' },
    'access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);  
}
bootstrap();
