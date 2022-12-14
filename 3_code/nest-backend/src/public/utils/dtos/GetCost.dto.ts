import { IsNotEmpty } from "class-validator";

export class GetCostDto {
  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  destination: string;

  @IsNotEmpty()
  weight: string;

  @IsNotEmpty()
  courier: string;
}