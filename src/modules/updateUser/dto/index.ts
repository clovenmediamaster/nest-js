import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  country?: string;

  @IsOptional()
  postalCode?: string;

  @IsOptional()
  about?: string;
}
