import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calc } from './calculator.entity';
import { Repository } from 'typeorm';
import { validateParams } from 'src/helpers/validation';
import { checkResult } from 'src/helpers/checkResult';
import { Injectable, Inject } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class ApiCalcController {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis,
    @InjectRepository(Calc)
    private calcRepo: Repository<Calc>,
  ) {}

  private async getCachedOrNewCalculation(
    param1: number,
    param2: number,
    result: number,
    redisClient: Redis.Redis,
    calcRepo: Repository<Calc>,
  ) {
    const redisKey = `addition: ${param1}:${param2}:${result}`;
    const cachedResult = await redisClient.get(redisKey);
    if (cachedResult !== null) return JSON.parse(cachedResult);

    const calc = await calcRepo.findOne({
      where: { param1, param2, result },
    });

    if (calc) {
      await redisClient.set(redisKey, JSON.stringify(calc));
      return calc;
    }
    const newCalc = await calcRepo.save(checkResult(result, param1, param2));

    await redisClient.set(redisKey, JSON.stringify(newCalc));
    return newCalc;
  }

  public async addition(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = Number(param1) + Number(param2);
    return await this.getCachedOrNewCalculation(
      param1,
      param2,
      result,
      this.redisClient,
      this.calcRepo,
    );
  }

  public async subtract(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = param1 - param2;
    return await this.getCachedOrNewCalculation(
      param1,
      param2,
      result,
      this.redisClient,
      this.calcRepo,
    );
  }

  public async multiply(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = param1 * param2;
    return await this.getCachedOrNewCalculation(
      param1,
      param2,
      result,
      this.redisClient,
      this.calcRepo,
    );
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
      return await this.getCachedOrNewCalculation(
        param1,
        param2,
        result,
        this.redisClient,
        this.calcRepo,
      );
    }
  }
}
