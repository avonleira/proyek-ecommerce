import { IsNotEmpty, IsEmail, IsNumberString, IsEnum } from 'class-validator'
import { Match } from 'src/extensions/custom.validator';
import { GenderType } from 'src/utils/enums';

export class UpdateUserDto {
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
  date_birth: string;
}