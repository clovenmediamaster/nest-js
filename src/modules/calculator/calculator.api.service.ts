import { CalcDto } from '../../controllers/dto/calculator.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CalculatorAppService } from './calculator.app.sevice';

@Injectable()
export class CalcApiService {
  constructor(private appService: CalculatorAppService) {}
  public async execute({
    operation,
    param1,
    param2,
  }: CalcDto): Promise<number> {
    const number1 = parseFloat(param1); //?
    const number2 = parseFloat(param2); //?

    if (isNaN(number1) || isNaN(number2)) {
      throw new BadRequestException('params are invalid');
    }

    return this.appService.calculate(operation, number1, number2, false);
  }
}
