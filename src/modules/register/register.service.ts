import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { userDto } from '../../controllers/dto/register.dto';
import { User } from './register.entity';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: userDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await hash(createUserDto.password, saltRounds);

    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();
    user.firstName = createUserDto.firstName;
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.role = createUserDto.role || 'user';

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new Error('Unable to create user');
    }
  }
}
