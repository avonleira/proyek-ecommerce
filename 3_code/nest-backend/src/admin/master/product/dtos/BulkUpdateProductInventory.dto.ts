import { Type } from 'class-transformer';
import {IsNotEmpty, IsArray, IsNumber, ArrayNotEmpty, ValidateNested } from 'class-validator'

export class BulkUpdateProductInventoryDto {
  @IsArray()
  @ValidateNested()
  @Type(() => UpdateProductInventoryDto)
  product_inventories: UpdateProductInventoryDto[]
}

class UpdateProductInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number

  @IsNumber({},{each: true})
  combination_option: number[];

  @IsNotEmpty()
  stock: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  SKU: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, {each: true})
  image_refs: number[];
}