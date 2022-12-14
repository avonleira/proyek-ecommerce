import { Type } from 'class-transformer';
import {IsNotEmpty, IsArray, IsNumber, ValidateNested, ArrayNotEmpty } from 'class-validator'

export class CheckoutCartDto {
  @IsArray()
  carts: number[]
}