import { Module } from '@nestjs/common';
import { LoginController } from '../../controllers/login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant';
import { User } from '../register/register.entity';
import { RegisterModule } from '../register/register.module';

@Module({
  imports: [
    RegisterModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [LoginService],
  controllers: [LoginController],
  exports: [LoginService],
})
export class LoginModule {}
