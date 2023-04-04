import { Module } from '@nestjs/common';
import { CalcModule } from './modules/calculator/calculator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfig } from './configs/dev.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { register } from 'prom-client';
import { UserModule } from './modules/user/user.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { updateUserController } from './modules/updateUser/updateUser.controller';
import { updateUserService } from './modules/updateUser/updateUser.service';

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
  controllers: [AppController, AuthController, updateUserController],
  providers: [
    AppService,
    updateUserService,
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
