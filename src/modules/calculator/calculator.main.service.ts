import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calc } from './calculator.entity';
import { Repository } from 'typeorm';
import * as Redis from 'ioredis';

@Injectable()
export class CalculatorMainService {
  constructor(
    @InjectRepository(Calc)
    private calcRepo: Repository<Calc>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis,
  ) {}

  public async getData({ param1, param2, operation }, forceRefresh: boolean) {
    let data: unknown = { error: 'someError' }; //         const result = {}  as SomeEntity
    if (!forceRefresh) {
      const redisKey = `${param1}:${param2}:${operation}`;
      const redisData = await this.redisClient.get(redisKey);

      if (!redisData) {
        try {
          data = await this.calcRepo.findOne({
            where: { param1, param2, operation },
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    }

    return data;
  }

  public async setMysql(
    param1: number,
    param2: number,
    result: number,
    operation: string,
  ) {
    const calc = new Calc();
    calc.param1 = param1;
    calc.param2 = param2;
    calc.result = result;
    calc.date_created = new Date();
    calc.status = 'OK';
    calc.operation = operation;

    await this.calcRepo.save(calc);

    const redisKey = `${param1}:${param2}:${operation}`;
    const redisValue = JSON.stringify({ param1, param2, result, operation });
    await this.redisClient.set(redisKey, redisValue);
  }
}
