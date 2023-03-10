import { Module } from '@nestjs/common';
import { CalcModule } from './modules/calculator/calculator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calc } from './modules/calculator/calculator.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as redis from 'redis';

const redisClient = redis.createClient();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '111111',
      database: 'calc',
      entities: [Calc],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientsModule.register([
      {
        name: 'REDIS_CLIENT',
        transport: Transport.REDIS as any,
        options: {
          url: 'redis://localhost:6379',
        },
      },
    ]),
    CalcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
