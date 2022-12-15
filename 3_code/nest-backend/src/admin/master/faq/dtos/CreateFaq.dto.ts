import { IsOptional, IsNotEmpty } from 'class-validator'

export class CreateFaqDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  answer: string;

  @IsNotEmpty()
  question: string;
}