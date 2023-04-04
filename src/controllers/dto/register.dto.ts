import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class userDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsString()
  userName: string;

  @IsString()
  lastName: string;
}
