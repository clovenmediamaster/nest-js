import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResDto } from './dto/LoginResDto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<LoginResDto> {
    const { email, password } = body;

    return await this.authService.validateUser(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('')
  getProfile(@Request() req) {
    return req.user;
  }
}
