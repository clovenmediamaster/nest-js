import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../register/register.entity';
import { userDto } from '../../controllers/dto/register.dto';
import { hash } from 'bcryptjs';
import { pick } from 'lodash';

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateUser(id: string, updateUserDto: userDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    const saltRounds = 10;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fieldsToUpdate = pick(updateUserDto, [
      'firstName',
      'lastName',
      'email',
      'userName',
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
