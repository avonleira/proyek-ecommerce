import { Type } from 'class-transformer';
import { IsNumberString, IsEnum, IsOptional, IsISO8601, ValidateIf, isNotEmpty, IsNotEmpty, IsArray, ValidateNested, IsNumber } from 'class-validator'

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
  product_category_id: number;

  @IsArray()
  @Type(() => ProductOptions)
  product_options: Array<object>;

  @IsOptional()
  @IsNotEmpty()
  is_draft: boolean;
}

class ProductOptions{
  @IsNumber()
  product_option: number

  @IsArray()
  product_option_value: Array<number>
}