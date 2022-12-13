import { IsNotEmpty, IsNumberString, IsOptional } from "class-validator";

export class CreateProductCategoryDto {
  @IsNotEmpty()
  category_name: string;

  @IsOptional()
  @IsNumberString()
  parent_id: number;

  @IsOptional()
  @IsNumberString()
  level: number;
}