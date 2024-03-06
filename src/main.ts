import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT', 4000);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
};

bootstrap();
