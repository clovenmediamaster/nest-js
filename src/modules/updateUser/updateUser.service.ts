import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { UpdateUserDto } from './dto';
import { hash } from 'bcryptjs';
import { pick } from 'lodash';

@Injectable()
export class updateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    const saltRounds = 10;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fieldsToUpdate = pick(updateUserDto, [
      'firstName',
      'lastName',
      'email',
      'address',
      'city',
      'country',
      'postalCode',
      'about',
    ]);

    if (updateUserDto.password) {
      const hashedPassword = await hash(updateUserDto.password, saltRounds);
      fieldsToUpdate.password = hashedPassword;
    }

    Object.assign(user, fieldsToUpdate);

    await this.userRepository.save(user);
    return user;
  }
}
