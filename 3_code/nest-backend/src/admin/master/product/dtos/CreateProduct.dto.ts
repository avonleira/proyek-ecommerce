import { IsOptional, IsNotEmpty } from 'class-validator'

export class CreateProductDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @IsNotEmpty()
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