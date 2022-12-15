import { Optional } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { IsNumberOrStringNumber } from "src/extensions/custom.validator";

export class CreateReviewDto {

  @IsNotEmpty()
  @IsNumberOrStringNumber()
  @Transform(({value}) => parseInt(value))
  dtrans_id: number

  @IsNotEmpty()
  @IsNumberOrStringNumber()
  @Transform(({value}) => parseInt(value))
  rating: number;

  @Optional()
  @IsNotEmpty()
  review: string;
}