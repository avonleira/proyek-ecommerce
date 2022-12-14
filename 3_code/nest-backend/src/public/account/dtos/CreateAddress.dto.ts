import { Optional } from "@nestjs/common";import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, Min } from "class-validator";
;
import { IsNumberOrStringNumber } from "src/extensions/custom.validator";

export class CreateAddressDto {

  @IsNotEmpty()
  @IsNumberOrStringNumber()
  @Transform(({ value }) => parseInt(value))
  city_id: number;

  @IsNotEmpty()
  address: string

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => Boolean(value))
  is_default: boolean = false;
}