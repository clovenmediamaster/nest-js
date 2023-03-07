import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

type calcData = {
  status: string;
  data: number;
};

@Controller('calc')
export class CalcController {
  @Get('addition/:param1/:param2')
  addition(
    @Param('param1') param1: string,
    @Param('param2') param2?: string,
  ): calcData {
    const result = parseInt(param1) + parseInt(param2);
    return this.checkResult(result);
  }

  @Get('subtract/:param1/:param2')
  subtract(
    @Param('param1') param1: number,
    @Param('param2') param2?: number,
  ): calcData {
    const result = param1 - param2;
    return this.checkResult(result);
  }

  @Get('multiply/:param1/:param2')
  multiply(
    @Param('param1') param1: number,
    @Param('param2') param2?: number,
  ): calcData {
    const result = param1 * param2;
    return this.checkResult(result);
  }

  @Get('divide/:param1/:param2?')
  divide(
    @Param('param1') param1: number,
    @Param('param2') param2?: number,
  ): calcData {
    if (param2 === undefined || param2 == 0) {
      throw new HttpException(
        'The second param must be provided and cannot be "0"',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const result = param1 / param2;
      return this.checkResult(result);
    }
  }

  private checkResult(result: number): calcData {
    if (result > 1000000000 || result < -1000000000) {
      throw new HttpException(
        'The result cannot be more than 1 000 000 000 or less than -1 000 000 000',
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: 'OK', data: result };
  }
}
