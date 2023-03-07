import { HttpException, HttpStatus } from '@nestjs/common';
import { calcData } from 'src/controllers/dto/calculator.dto';
import * as Joi from 'joi';

export class ApiCalcController {
  private paramsSchema = Joi.object({
    param1: Joi.number().required(),
    param2: Joi.number().required(),
  });

  private validation(param1: any, param2: any) {
    const { error } = this.paramsSchema.validate({ param1, param2 });
    if (error) {
      throw new HttpException('Please enter a number', HttpStatus.BAD_REQUEST);
    }
  }

  private checkResult(result: number): calcData {
    if (result > 1000000000 || result < -1000000000) {
      throw new HttpException(
        'The result cannot be more than 1 000 000 000 or less than -1 000 000 000',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { status: 'OK', data: result };
  }

  public addition(param1: string, param2: string) {
    this.validation(param1, param2);
    const result = parseInt(param1) + parseInt(param2);
    return this.checkResult(result);
  }

  public subtract(param1: number, param2: number) {
    this.validation(param1, param2);
    const result = param1 - param2;
    return this.checkResult(result);
  }

  public multiply(param1: number, param2: number) {
    this.validation(param1, param2);
    const result = param1 * param2;
    return this.checkResult(result);
  }

  public divide(param1: number, param2: number) {
    this.validation(param1, param2);
    if (param2 === undefined || param2 == 0) {
      throw new HttpException(
        'The second param must be provided and cannot be "0"',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const result = param1 / param2;
      return this.checkResult(result);
    }
  }
}

// if (typeof param1 !== 'string' || typeof param2 !== 'string') {
//     throw new HttpException(
//       'Parameters must be of type string',
//       HttpStatus.BAD_REQUEST,
//     );
//   }
