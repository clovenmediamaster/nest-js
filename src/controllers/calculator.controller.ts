import { ApiCalcController } from 'src/modules/calculator/calculator.api.service';
import {CalcDto} from "./dto/calculator.dto";
import { Controller, Get, Param } from '@nestjs/common';

@Controller('calc')
export class CalcController {
  constructor(private apiService: ApiCalcController) {}
//
  @Get('/:operation/:param1/:param2')
  async addition(@Param() params: CalcDto): Promise<unknown> {  // Unknown -> CalcRto
    return await this.apiService.execute(params);
  }
}
