import { Module } from '@nestjs/common';
import { UpdateUserController } from '../../controllers/updateUser.controller';
import { UpdateUserService } from './updateUser.service';
import { RegisterModule } from '../register/register.module';

@Module({
  imports: [RegisterModule],
  controllers: [UpdateUserController],
  providers: [UpdateUserService],
})
export class UpdateUserModule {}
