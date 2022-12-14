import { IsNotEmpty, IsEmail, IsNumberString, IsEnum, IsISO8601, IsOptional } from 'class-validator'
import { GenderType } from '../../utils/enums';
import { Match } from '../../extensions/custom.validator'
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @Match('password')
  @IsNotEmpty()
  confirmPassword: string

  @IsNotEmpty()
  name: string;

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