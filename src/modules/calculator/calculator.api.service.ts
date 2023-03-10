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

  public async addition(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = Number(param1) + Number(param2);

    const redisKey = `addition: ${param1}:${param2}:${result}`;
    const cachedResult = await this.redisClient.get(redisKey);
    if (cachedResult !== null) return JSON.parse(cachedResult);

    const calc = await this.calcRepo.findOne({
      where: { param1, param2, result },
    });
    if (calc) {
      await this.redisClient.set(redisKey, JSON.stringify(calc));
      return calc;
    }
    const newCalc = await this.calcRepo.save(
      checkResult(result, param1, param2),
    );

    await this.redisClient.set(redisKey, JSON.stringify(newCalc));
    return newCalc;
  }

  public async subtract(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = param1 - param2;
    const calc = await this.calcRepo.findOne({
      where: { param1, param2, result },
    });
    if (calc) return calc;
    return await this.calcRepo.save(checkResult(result, param1, param2));
  }

  public async multiply(param1: number, param2: number) {
    validateParams(param1, param2);
    const result = param1 * param2;
    const calc = await this.calcRepo.findOne({
      where: { param1, param2, result },
    });
    if (calc) return calc;
    return await this.calcRepo.save(checkResult(result, param1, param2));
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
      const calc = await this.calcRepo.findOne({
        where: { param1, param2, result },
      });
      if (calc) return calc;
      return await this.calcRepo.save(checkResult(result, param1, param2));
    }
  }
}
