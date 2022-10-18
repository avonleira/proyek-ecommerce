import { IsNotEmpty, IsEmail, IsNumberString, IsEnum, IsISO8601, IsOptional } from 'class-validator'
import { GenderType } from 'src/utils/enums';
import { Match } from 'src/extensions/custom.validator'
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Match('password')
  @IsNotEmpty()
  confirm_password: string

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEnum(GenderType) 
  @IsNotEmpty()
  gender: GenderType;

  @IsNumberString()
  @IsNotEmpty()
  phone_number: string;

  @IsOptional()
  @IsISO8601()
  date_birth: string;
}