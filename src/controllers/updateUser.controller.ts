import { Controller, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateUserService } from '../modules/updateUser/updateUser.service';
import { userDto } from './dto/register.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly userService: UpdateUserService) {}

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: userDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
