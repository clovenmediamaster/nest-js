import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await hash(createUserDto.password, saltRounds);

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }
}
