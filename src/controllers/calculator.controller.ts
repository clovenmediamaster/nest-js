import { ApiCalcController } from 'src/modules/calculator/calculator.api.service';

import { Controller, Get, Param } from '@nestjs/common';

@Controller('calc')
export class CalcController {
  constructor(private apiService: ApiCalcController) {}

  @Get('addition/:param1/:param2?')
  async addition(
    @Param() params: { param1: string; param2?: string },
  ): Promise<number> {
    const { param1, param2 } = params;
    return await this.apiService.addition(param1, param2);
  }

  @Get('subtract/:param1/:param2?')
  async subtract(
    @Param() params: { param1: number; param2?: number },
  ): Promise<number> {
    const { param1, param2 } = params;
    return await this.apiService.subtract(param1, param2);
  }

  @Get('multiply/:param1/:param2?')
  async multiply(
    @Param() params: { param1: number; param2?: number },
  ): Promise<number> {
    const { param1, param2 } = params;
    return await this.apiService.multiply(param1, param2);
  }

  @Get('divide/:param1/:param2?')
  async divide(
    @Param() params: { param1: number; param2?: number },
  ): Promise<number> {
    const { param1, param2 } = params;
    return await this.apiService.divide(param1, param2);
  }
}
