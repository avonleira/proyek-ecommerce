import { IsNotEmpty, IsEmail, IsNumberString, IsEnum, IsISO8601, IsOptional } from 'class-validator'
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}