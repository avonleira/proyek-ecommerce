import { Type } from 'class-transformer';
import {IsNotEmpty, IsArray, IsNumber, ValidateNested, ArrayNotEmpty, IsOptional } from 'class-validator'

export class CheckoutCartDto {
  @IsOptional()
  @IsArray()
  carts: number[]

  @IsOptional()
  voucher: any
}