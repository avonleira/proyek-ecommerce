import { Optional } from "@nestjs/common";import { Expose, Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, Min } from "class-validator";
;
import { IsNumberOrStringNumber } from "src/extensions/custom.validator";

export class UpdateAddressDto {

  @IsOptional()
  @IsNotEmpty()
  @IsNumberOrStringNumber()
  @Transform(({ value }) => parseInt(value))
  city_id: number;

  @IsOptional()
  @IsNotEmpty()
  address: string

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Boolean(value))
  is_default: boolean = false;
}