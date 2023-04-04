import { Module } from '@nestjs/common';
import { UpdateUserController } from '../../controllers/updateUser.controller';
import { UpdateUserService } from './updateUser.service';
import { UserModule } from '../register/register.module';

@Module({
  imports: [UserModule],
  controllers: [UpdateUserController],
  providers: [UpdateUserService],
})
export class UpdateUserModule {}
