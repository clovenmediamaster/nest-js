import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Redis from 'ioredis';
import { Repository } from 'typeorm';
import { getLogger } from '../../helpers/logger';
import { Calc } from './calculator.entity';

@Injectable()
export class CalculatorMainService {
  private logger = getLogger();

  constructor(
    @InjectRepository(Calc)
    private calcRepo: Repository<Calc>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis,
  ) {}

  public async getData({ param1, param2, operation }, forceRefresh: boolean) {
    let data: any = { error: 'someError' };

    if (!forceRefresh) {
      const redisKey = `${param1}:${param2}:${operation}`;
      const redisData = await this.redisClient.get(redisKey);

      if (!redisData) {
        try {
          data = await this.calcRepo.findOne({
            where: { param1, param2, operation },
          });
        } catch (err) {
          this.logger.error(err.message);
        }
      } else {
        data = JSON.parse(redisData);
      }
    } else {
      try {
        data = await this.calcRepo.findOne({
          where: { param1, param2, operation },
        });
      } catch (err) {
        this.logger.error(err.message);
      }
      const redisKey = `${param1}:${param2}:${operation}`;
      await this.redisClient.set(redisKey, data);
    }

    this.logger.debug(`Received data successfully`);

    return data;
  }

  public async setDate(
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

    try {
      await this.calcRepo.save(calc); // add number code

      const redisKey = `${param1}:${param2}:${operation}`;
      const redisValue = JSON.stringify({ param1, param2, result, operation });
      await this.redisClient.set(redisKey, redisValue);

      this.logger.info('Data saved successfully');
    } catch (err) {
      this.logger.error(err.message); //fix message
    }
  }
}
