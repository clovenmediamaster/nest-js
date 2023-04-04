import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginService } from '../modules/login/login.service';
import { LoginResDto } from './dto/login.dto';

@Controller('auth')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<LoginResDto> {
    const { email, password } = body;

    return await this.loginService.validateUser(email, password);
  }
}
