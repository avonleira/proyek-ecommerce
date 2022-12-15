import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateFaqDto {
  @IsOptional()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsNotEmpty()
  answer: string;

  @IsOptional()
  @IsNotEmpty()
  question: string;
}