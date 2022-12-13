import { Type } from 'class-transformer';
import {IsNotEmpty, IsArray, IsNumber, ValidateNested, ArrayNotEmpty } from 'class-validator'

export class BulkCreateProductInventoryDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateProductInventoryDto)
  product_inventories: CreateProductInventoryDto[]
}

class CreateProductInventoryDto {
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