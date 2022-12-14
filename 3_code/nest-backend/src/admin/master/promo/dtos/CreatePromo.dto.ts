import { Expose, Transform } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsOptional } from "class-validator";
import { PromoType } from "src/utils/enums";

export class CreatePromoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @Expose()
  @Transform(({obj}) => obj.amount.includes('%') ? PromoType.PERCENTAGE : PromoType.FIXED)
  type: string

  @IsNotEmpty()
  amount: string;

  @IsISO8601()
  active_date: Date;

  @IsISO8601()
  expired_date: Date;
}