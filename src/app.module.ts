import { Module } from '@nestjs/common';
import { CalcModule } from './modules/calculator/calculator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './configs/dev.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlConfig as TypeOrmModuleOptions),
    CalcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  onModuleDestroy() {
    console.log(`The module is being destroyed.`);
  }
}
