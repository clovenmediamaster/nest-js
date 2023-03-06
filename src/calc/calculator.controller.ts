import { Controller, Get, Param } from '@nestjs/common';
type calcResult = {
  status: string;
  data: number;
};

@Controller('calc')
export class CalcController {
  @Get('addition/:param1/:param2')
  addition(
    @Param('param1') param1: string,
    @Param('param2') param2: string,
  ): calcResult {
    // const result = param1 + param2;
    const result = parseInt(param1) + parseInt(param2);
    return { status: 'OK', data: result };
  }

  @Get('subtract/:param1/:param2')
  subtract(
    @Param('param1') param1: number,
    @Param('param2') param2: number,
  ): calcResult {
    const result = param1 - param2;
    return { status: 'OK', data: result };
  }

  @Get('multiply/:param1/:param2')
  multiply(
    @Param('param1') param1: number,
    @Param('param2') param2: number,
  ): calcResult {
    const result = param1 * param2;
    return { status: 'OK', data: result };
  }

  @Get('divide/:param1/:param2')
  divide(
    @Param('param1') param1: number,
    @Param('param2') param2: number,
  ): calcResult {
    const result = param1 / param2;
    return { status: 'OK', data: result };
  }
}
