import { Module } from '@nestjs/common';
import { CalcController } from 'src/controllers/calculator.controller';
import { CalcApiService } from './calculator.api.service';
import { CalcModule } from './calculator.module';

@Module({
  imports: [CalcModule],
  providers: [CalcApiService],
  controllers: [CalcController],
})
export class UserHttpModule {}
