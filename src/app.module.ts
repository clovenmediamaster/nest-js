import { Module } from '@nestjs/common';
import { CalcModule } from './modules/calculator/calculator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './configs/dev.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { register } from 'prom-client';
import { RegisterModule } from './modules/register/register.module';
import { LoginModule } from './modules/login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { UpdateUserModule } from './modules/updateUser/updateUser.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlConfig as TypeOrmModuleOptions),
    CalcModule,
    RegisterModule,
    LoginModule,
    UpdateUserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'Prometheus',
      useValue: register,
    },
  ],
})
export class AppModule {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  onModuleDestroy() {
    console.log(`The module is being destroyed.`);
  }
}
