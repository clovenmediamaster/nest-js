import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalcController } from './calc/calculator.controller';

@Module({
  imports: [],
  controllers: [AppController, CalcController],
  providers: [AppService],
})
export class AppModule {}
