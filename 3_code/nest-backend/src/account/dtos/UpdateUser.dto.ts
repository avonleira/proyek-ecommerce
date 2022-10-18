import { IsNumberString, IsEnum, IsOptional, IsISO8601, ValidateIf, isNotEmpty, IsNotEmpty } from 'class-validator'
import { MatchIfExist } from 'src/extensions/custom.validator';
import { GenderType } from 'src/utils/enums';

export class UpdateUserDto {
  @ValidateIf(o => o.password != undefined)
  @IsNotEmpty()
  old_password: string

  password: string;
  @MatchIfExist('password')
  confirm_password: string

  @IsOptional()
  @IsNotEmpty()
  first_name: string;

  @IsOptional()
  @IsNotEmpty()
  last_name: string;
  
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