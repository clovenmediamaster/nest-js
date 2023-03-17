import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Redis from 'ioredis';
import { Repository } from 'typeorm';
import { createLogger, Logger, transports } from 'winston';
import { Calc } from './calculator.entity';

@Injectable()
export class CalculatorMainService {
  private logger: Logger;

  constructor(
    @InjectRepository(Calc)
    private calcRepo: Repository<Calc>,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis.Redis,
  ) {
    this.logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' }),
      ],
    });
  }

  public async getData({ param1, param2, operation }, forceRefresh: boolean) {
    let data: unknown = { error: 'someError' };

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
        data = redisData;
      }
    }

    this.logger.info(`Received data successfully`);

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

    try {
      await this.calcRepo.save(calc);

      const redisKey = `${param1}:${param2}:${operation}`;
      const redisValue = JSON.stringify({ param1, param2, result, operation });
      await this.redisClient.set(redisKey, redisValue);

      this.logger.info('Data saved successfully');
    } catch (err) {
      this.logger.error(err.message);
    }
  }
}
