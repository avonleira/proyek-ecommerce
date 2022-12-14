import { Expose, Transform } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { PromoType } from "src/utils/enums";

export class updatePromoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @Expose()
  @Transform(({obj}) => {
    if (!obj.amount)
      return undefined
    else 
      return obj.amount.includes('%') ? PromoType.PERCENTAGE : PromoType.FIXED
  })
  type: string

  @IsOptional()
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  @IsISO8601()
  active_date: Date;

  @IsOptional()
  @IsISO8601()
  expired_date: Date;
}