import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '../../modules/register/register.entity';

export class LoginResDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;

  user: User;
}
