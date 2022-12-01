import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateProductOptionValueDto {
  @IsNotEmpty()
  value: string;
}