import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // Necesitas instalarlo: npm i class-validator class-transformer
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.setGlobalPrefix('api');

  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  
  app.enableCors();

  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  
  console.log(`🚀 Microservicio de Archivos corriendo en: http://localhost:${port}/api`);
}
bootstrap();