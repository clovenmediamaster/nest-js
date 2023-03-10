import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calc } from './calculator.entity';
import { Repository } from 'typeorm';
import { validateParams, checkResult } from 'src/helpers/validation';

@Injectable()
export class ApiCalcController {
  constructor(
    @InjectRepository(Calc)
    private calcRepo: Repository<Calc>,
  ) {}

  public async addition(param1: string, param2: string) {
    validateParams(param1, param2);
    const result = parseInt(param1) + parseInt(param2);
    const calc = await this.calcRepo.findOne({ where: { result } });
    if (calc) {
      return checkResult(result, param1, param2);
    } else {
      return await this.calcRepo.save(checkResult(result, param1, param2));
    }
  }

  public async subtract(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = param1 - param2;
    const calc = await this.calcRepo.findOne({ where: { result } });
    if (calc) {
      return checkResult(result, param1, param2);
    } else {
      return await this.calcRepo.save(checkResult(result, param1, param2));
    }
  }

  public async multiply(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = param1 * param2;
    const calc = await this.calcRepo.findOne({ where: { result } });
    if (calc) {
      return checkResult(result, param1, param2);
    } else {
      return await this.calcRepo.save(checkResult(result, param1, param2));
    }
  }

  public async divide(param1: number, param2: number) {
    validateParams(param1, param2);
    if (param2 === undefined || param2 == 0) {
      throw new HttpException(
        'The second param must be provided and cannot be "0"',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const result = param1 / param2;
      const calc = await this.calcRepo.findOne({ where: { result } });
      if (calc) {
        return checkResult(result, param1, param2);
      } else {
        return await this.calcRepo.save(checkResult(result, param1, param2));
      }
    }
  }
}
