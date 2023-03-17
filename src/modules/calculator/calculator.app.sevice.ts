import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CalculatorMainService } from './calculator.main.service';

@Injectable()
export class CalculatorAppService {
  constructor(private mainService: CalculatorMainService) {}

  public async calculate(
    operation: 'addition' | 'subtract' | 'multiply' | 'divide',
    param1: number,
    param2: number,
    forceRefresh = false,
  ): Promise<number> {
    let result: number;

    const data: any = this.mainService.getData(
      { param1, param2, operation },
      forceRefresh,
    );

    result = data.result;

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
