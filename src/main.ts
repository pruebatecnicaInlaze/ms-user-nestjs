import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { environment, OpenApi } from './config';

async function main() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const document = OpenApi.swaggerConfig(app);
  SwaggerModule.setup('/', app, document);
  await app.listen(environment.port);
}
main();
