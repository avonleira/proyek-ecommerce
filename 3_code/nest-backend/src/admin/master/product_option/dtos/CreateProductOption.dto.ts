import { IsNotEmpty } from "class-validator";

export class CreateProductOptionDto {
  @IsNotEmpty()
  option_name: string;
}