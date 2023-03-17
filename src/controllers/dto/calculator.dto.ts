import { IsString } from 'class-validator';

export class CalcDto {
  @IsString()
  operation: 'addition' | 'subtract' | 'multiply' | 'divide';

  @IsString()
  param1: string;

  @IsString()
  param2: string;
}
