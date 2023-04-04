import { IsString, IsNotEmpty } from 'class-validator';
import { User } from 'src/modules/user/user.entity';

export class LoginResDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  user: User;
}
