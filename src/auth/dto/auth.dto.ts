import { IsNotEmpty, IsString, IsEmail, IsDateString } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  avatar: string;

  status: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  role: string;

  refreshToken: string;
}
