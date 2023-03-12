import { Module } from '@nestjs/common';
// import { DataSource } from 'typeorm';
import { CalcModule } from './modules/calculator/calculator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calc } from './modules/calculator/calculator.entity';
import {MysqlConfig} from "./configs/dev.config";
import {TypeOrmModuleOptions} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlConfig as TypeOrmModuleOptions),
    CalcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  async onModuleInit() {
    // initialisation
  }
  // TODO: read docs about module functions
  async onModuleDestroy() {

  }
}

//
