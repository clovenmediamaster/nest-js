import { Module } from '@nestjs/common';
import { CalcController } from 'src/controllers/calculator.controller';
import { ApiCalcController } from './calculator.api.service';
import { CalcModule } from './calculator.module';

@Module({
  imports: [CalcModule],
  providers: [ApiCalcController],
  controllers: [CalcController],
})
export class UserHttpModule {}
