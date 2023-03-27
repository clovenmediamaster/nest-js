import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Call onModuleInit() when the app has finished bootstrapping
  await app.init();

  await app.listen(3000);
}

bootstrap();
