import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CalculatorMainService } from './calculator.main.service';

@Injectable()
export class CalculatorAppService {
  constructor(private mainService: CalculatorMainService) {}

  public async calculate(
    operation: string,
    param1: number,
    param2: number,
    forceRefresh = false,
  ) {
    let result: any;

    const data = await this.mainService.getData(
      { param1, param2, operation },
      forceRefresh,
    );

    result = data;
    console.log(result);

    if (!result) {
      switch (operation) {
        case 'addition': {
          result = param1 + param2;
          break;
        }
        case 'subtract': {
          result = param1 - param2;
          break;
        }
        case 'multiply': {
          result = param1 * param2;
          break;
        }
        case 'divide': {
          if (param2 == 0) {
            throw new HttpException(
              'Cannot divide by zero',
              HttpStatus.BAD_REQUEST,
            );
          }
          result = param1 / param2;
          break;
        }
        default: {
          throw new HttpException(
            `Invalid operation: ${operation}`,
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      this.mainService.setMysql(param1, param2, result, operation);
    }

    return result;
  }
}
