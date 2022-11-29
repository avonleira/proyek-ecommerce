import { IsNumberString, IsEnum, IsOptional, IsISO8601, ValidateIf, isNotEmpty, IsNotEmpty } from 'class-validator'

export class UpdateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  slug: string;

  @IsNotEmpty()
  @IsNumberString()
  weight: number;

  @IsOptional()
  @IsNotEmpty()
  category_id: number;

  @IsOptional()
  @IsNotEmpty()
  product_option_refs: string;

  @IsOptional()
  @IsNotEmpty()
  image_refs: string;

  @IsOptional()
  @IsNotEmpty()
  is_draft: boolean;
}