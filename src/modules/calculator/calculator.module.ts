import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiCalcController } from './calculator.api.service';
import { CalcController } from 'src/controllers/calculator.controller';
import { Calc } from './calculator.entity';
import Redis from 'ioredis';

@Module({
  imports: [TypeOrmModule.forFeature([Calc])],
  exports: [TypeOrmModule, ApiCalcController],
  controllers: [CalcController],
  providers: [
    ApiCalcController,
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis();
      },
    },
  ],
})
export class CalcModule {}
