import { Module } from '@nestjs/common';
import { CalcController } from 'src/controllers/calculator.controller';
import { ApiCalcController } from './calculator.api.service';

@Module({
  controllers: [CalcController],
  providers: [ApiCalcController],
})
export class CalcModule {}
