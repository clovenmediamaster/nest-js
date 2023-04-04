import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../register/register.entity';
import { compare } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginResDto } from '../../controllers/dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<LoginResDto | null> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    try {
      const token = await this.generateAccessToken(user);
      return {
        user,
        token,
      };
    } catch (error) {
      throw new UnauthorizedException('Unable to generate access token');
    }
  }
}
