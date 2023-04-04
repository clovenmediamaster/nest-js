import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { metricsMiddleware } from './metrics.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(metricsMiddleware);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Call onModuleInit() when the app has finished bootstrapping
  await app.init();

  await app.listen(3002);
}

bootstrap();
