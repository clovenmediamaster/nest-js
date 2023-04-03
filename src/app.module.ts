import { Module } from '@nestjs/common';
import { CalcModule } from './modules/calculator/calculator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './configs/dev.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { register } from 'prom-client';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';

@Module({
  imports: [
    TypeOrmModule.forRoot(MysqlConfig as TypeOrmModuleOptions),
    CalcModule,
    UserModule,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    {
      provide: 'Prometheus',
      useValue: register,
    },
    AuthService,
    UserService,
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
