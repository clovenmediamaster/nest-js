import { Controller, Put, Body, Param } from '@nestjs/common';
import { updateUserService } from './updateUser.service';
import { UpdateUserDto } from './dto';

@Controller('users')
export class updateUserController {
  constructor(private readonly userService: updateUserService) {}

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
