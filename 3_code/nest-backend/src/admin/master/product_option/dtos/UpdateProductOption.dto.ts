import { IsNotEmpty } from "class-validator";

export class UpdateProductOptionDto {
  @IsNotEmpty()
  option_name: string;
}