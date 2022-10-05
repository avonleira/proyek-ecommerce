import { IsNotEmpty, IsEmail, IsNumberString, IsEnum, IsISO8601 } from 'class-validator'
import { GenderType } from 'src/utils/enums';
import { Match } from 'src/extensions/custom.validator'
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

  @IsNotEmpty()
  @IsISO8601()
  date_birth: string;
}