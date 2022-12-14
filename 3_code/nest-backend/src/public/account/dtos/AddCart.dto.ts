import { Optional } from "@nestjs/common";import { Transform } from "class-transformer";
import { Min } from "class-validator";
;
import { IsNumberOrStringNumber } from "src/extensions/custom.validator";

export class AddCartDto {
  @Optional()
  @IsNumberOrStringNumber()
  @Transform(({ value }) => parseInt(value))
  @Min(1)
  count: number = 1;
}