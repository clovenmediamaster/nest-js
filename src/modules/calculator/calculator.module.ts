import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalcApiService } from './calculator.api.service';
import { CalcController } from 'src/controllers/calculator.controller';
import { Calc } from './calculator.entity';
import { CalculatorAppService } from './calculator.app.sevice';
import { CalculatorMainService } from './calculator.main.service';
import { RedisModule } from 'src/redis/redis';

@Module({
  imports: [TypeOrmModule.forFeature([Calc]), RedisModule],
  exports: [TypeOrmModule, CalcApiService],
  controllers: [CalcController],
  providers: [CalcApiService, CalculatorAppService, CalculatorMainService],
})
export class CalcModule {}
