import { Body, Controller, Post } from '@nestjs/common';
import { userDto } from './dto/register.dto';
import { RegisterService } from '../modules/register/register.service';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  async create(@Body() createUserDto: userDto) {
    return this.registerService.create(createUserDto);
  }
}
