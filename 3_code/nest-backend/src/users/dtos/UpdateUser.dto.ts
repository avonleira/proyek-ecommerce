import { IsNumberString, IsEnum, IsOptional, IsISO8601, ValidateIf, isNotEmpty, IsNotEmpty } from 'class-validator'
import { MatchIfExist } from 'src/extensions/custom.validator';
import { GenderType } from 'src/utils/enums';

export class UpdateUserDto {
  @ValidateIf(o => o.password != undefined)
  @IsNotEmpty()
  oldPassword: string

  password: string;
  @MatchIfExist('password')
  confirmPassword: string

  name: string;
  
  @IsOptional()
  @IsEnum(GenderType) 
  gender: GenderType;

  @IsOptional()
  @IsNumberString()
  phone_number: string;

  @IsOptional()
  @IsISO8601()
  date_birth: string;
}