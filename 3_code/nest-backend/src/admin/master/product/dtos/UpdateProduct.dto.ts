import { IsNumberString, IsEnum, IsOptional, IsISO8601, ValidateIf, isNotEmpty, IsNotEmpty } from 'class-validator'

export class UpdateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  @IsNumberString()
  weight: number;

  @IsNotEmpty()
  category_id: number;

  @IsOptional()
  @IsNotEmpty()
  product_option_refs: string;

  @IsOptional()
  @IsNotEmpty()
  is_draft: boolean;
}