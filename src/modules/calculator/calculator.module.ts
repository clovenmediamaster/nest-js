import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalcApiService } from './calculator.api.service';
import { CalcController } from '../../controllers/calculator.controller';
import { Calc } from './calculator.entity';
import { CalculatorAppService } from './calculator.app.sevice';
import { CalculatorMainService } from './calculator.main.service';
import { RedisModule } from '../../redis/redis';

@Module({
  imports: [TypeOrmModule.forFeature([Calc]), RedisModule],
  exports: [TypeOrmModule, CalcApiService],
  controllers: [CalcController],
  providers: [CalcApiService, CalculatorAppService, CalculatorMainService],
})
export class CalcModule {}
