import { Controller, Put, Body, Param } from '@nestjs/common';
import { UpdateUserService } from '../modules/updateUser/updateUser.service';
import { userDto } from './dto/register.dto';

@Controller('users')
export class UpdateUserController {
  constructor(private readonly userService: UpdateUserService) {}

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: userDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
