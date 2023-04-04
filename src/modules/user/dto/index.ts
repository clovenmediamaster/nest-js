import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
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

  // @IsString()
  // address: string;

  // @IsString()
  // city: string;

  // @IsString()
  // country: string;

  // @IsString()
  // postalCode: string;

  // @IsString()
  // about: string;
}
