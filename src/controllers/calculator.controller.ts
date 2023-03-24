import { CalcApiService } from '../modules/calculator/calculator.api.service';
import { CalcDto } from './dto/calculator.dto';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('calc')
export class CalcController {
  constructor(private apiService: CalcApiService) {}

  @Get('/:operation/:param1/:param2')
  async operate(@Param() params: CalcDto): Promise<number> {
    return await this.apiService.execute(params);
  }
}
