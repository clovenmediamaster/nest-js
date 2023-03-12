import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calc } from './calculator.entity';
import { Repository } from 'typeorm';
import { validateParams, checkResult } from 'src/helpers/validation';
import {CalculatorMainService} from "./calculator.main.service";

@Injectable()
export class CalculatorAppService {
    constructor(
        private mainService: CalculatorMainService
    ) {}

    public async addition(operation: string, param1: number, param2: number, forceRefresh = false) { //TODO: use return type

        const data = this.mainService.getData({}, forceRefresh)

        // @ts-ignore
        if (!data.error) {
            return data
        }
        let result
        switch (operation) {
            case 'addition': {
                result = param1 + param2
            }
        }

        const data = this.mainService.setData({}, true)

        return result
    }

}
