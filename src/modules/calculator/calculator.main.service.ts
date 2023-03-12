import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calc } from './calculator.entity';
import { Repository } from 'typeorm';
import { validateParams, checkResult } from 'src/helpers/validation';

@Injectable()
export class CalculatorMainService {
    constructor(
        @InjectRepository(Calc)
        private calcRepo: Repository<Calc>,


    ) {}

    public async getData(data: unknown, forceRefresh: boolean) {
        let result: unknown = {error: 'someError'}  //         const result = {}  as SomeEntity
        if (!forceRefresh) {
            const redisData = this.getRedis('')

            if(!redisData) {
                return redisData
            }
        }
        try {
            result = this.getMysql('', '')
        } catch(err) {

        }

        return result


    }

    public async setMysql(param1: string, param2: string) { // INPUT = ENNTITY

         const resultEntity = await this.calcRepo.save(checkResultData);

         await this.setRedis({})

        return resultEntity
    }

    public async getMysql(param1: string, param2: string) { // INPUT = ENNTITY
        validateParams(param1, param2);
        const result = parseInt(param1) + parseInt(param2);
        const checkResultData = checkResult(result, param1, param2);
        return await this.calcRepo.save(checkResultData);
    }

    public async getRedis(data: unknown): Promise<unknown> {

    }
    public async setRedis(data: unknown): Promise<unknown> {

    }

}
