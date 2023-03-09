import { HttpException, HttpStatus } from '@nestjs/common';
import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calc } from './calculator.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiCalcController {
  constructor(
    @InjectRepository(Calc)
    private calcRepo: Repository<Calc>,
  ) {}

  private paramsSchema = Joi.object({
    param1: Joi.number().required(),
    param2: Joi.number().required(),
  });

  private validation(param1: any, param2: any) {
    param1 = parseInt(param1);
    param2 = parseInt(param2);
    const { error } = this.paramsSchema.validate({ param1, param2 });
    if (error || param2 === undefined) {
      console.log(param2);
      throw new HttpException(
        'Please check both values. They must be numbers',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private checkResult(result, param1, param2): any {
    if (result > 1000000000 || result < -1000000000) {
      throw new HttpException(
        'The result cannot be more than 1 000 000 000 or less than -1 000 000 000',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      param1,
      param2,
      result,
      date_created: new Date(),
      status: 'OK',
    };
  }

  public async addition(param1: string, param2: string) {
    this.validation(param1, param2);
    const result = parseInt(param1) + parseInt(param2);
    const checkResultData = this.checkResult(result, param1, param2);
    return await this.calcRepo.save(checkResultData);
  }

  public async subtract(param1: number, param2: number) {
    this.validation(param1, param2);
    const result = param1 - param2;
    const checkResultData = this.checkResult(result, param1, param2);
    return await this.calcRepo.save(checkResultData);
  }

  public async multiply(param1: number, param2: number) {
    this.validation(param1, param2);
    const result = param1 * param2;
    const checkResultData = this.checkResult(result, param1, param2);
    return await this.calcRepo.save(checkResultData);
  }

  public async divide(param1: number, param2: number) {
    this.validation(param1, param2);
    if (param2 === undefined || param2 == 0) {
      throw new HttpException(
        'The second param must be provided and cannot be "0"',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const result = param1 / param2;
      const checkResultData = this.checkResult(result, param1, param2);
      console.log(checkResultData);
      return await this.calcRepo.save(checkResultData);
    }
  }
}
