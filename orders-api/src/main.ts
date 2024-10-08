import { NestFactory } from '@nestjs/core';
import { OrdersApiModule } from './orders-api.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrdersApiModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`Orders API is running on http://localhost:${port}`);
}
bootstrap();
