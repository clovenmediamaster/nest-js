import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calc } from './calculator.entity';
import { Repository } from 'typeorm';
import { validateParams, checkResult } from 'src/helpers/validation';

import {CalcDto} from "../../controllers/dto/calculator.dto";

@Injectable()
export class ApiCalcController {
  constructor(
    @InjectRepository(Calc)
    private calcRepo: Repository<Calc>,
  ) {}

  public async execute({operation, param1, param2}: CalcDto): Promise<unknown> {
      // convertor
      // custom validation
      // call app service
      // response convertor

      return
  }
}
