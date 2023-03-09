import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiCalcController } from './calculator.api.service';
import { CalcController } from 'src/controllers/calculator.controller';
import { Calc } from './calculator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calc])],
  exports: [TypeOrmModule, ApiCalcController],
  controllers: [CalcController],
  providers: [ApiCalcController],
})
export class CalcModule {}
