import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from '../../controllers/register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/redis/redis';
import { User } from './register.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  exports: [TypeOrmModule],
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
