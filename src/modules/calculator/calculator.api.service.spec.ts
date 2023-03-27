import { CalcDto } from '../../controllers/dto/calculator.dto';
import { BadRequestException } from '@nestjs/common';
import { CalculatorAppService } from './calculator.app.sevice';
import { CalcApiService } from './calculator.api.service';

describe('CalcApiService', () => {
  // описуємо групу тестів для класу CalcApiService
  let service: CalcApiService;
  let appService: CalculatorAppService;

  beforeEach(() => {
    // перед кожним тестом створюємо новий екземпляр CalcApiService та CalculatorAppService
    appService = {
      calculate: jest.fn(),
    } as any;
    service = new CalcApiService(appService);
  });

  describe('execute', () => {
    // описуємо групу тестів для методу execute класу CalcApiService
    it('should throw BadRequestException when params are invalid', async () => {
      // перший тест перевіряє, що метод execute кидатиме BadRequestException, якщо параметри запиту неправильні
      const dto: CalcDto = { operation: 'addition', param1: 'a', param2: '2' };
      await expect(service.execute(dto)).rejects.toThrow(BadRequestException);
    });

    it('should call appService.calculate with correct params', async () => {
      // другий тест перевіряє, що метод execute викликає метод calculate класу CalculatorAppService з правильними параметрами
      const dto: CalcDto = { operation: 'addition', param1: '2', param2: '3' };
      await service.execute(dto);
      expect(appService.calculate).toHaveBeenCalledWith(
        'addition',
        2,
        3,
        false,
      );
    });

    it('should return the result of appService.calculate', async () => {
      // третій тест перевіряє, що метод execute повертає результат методу calculate класу CalculatorAppService
      const dto: CalcDto = { operation: 'subtract', param1: '5', param2: '3' };
      const expectedResult = 2;
      appService.calculate = jest.fn().mockResolvedValue(expectedResult);
      const result = await service.execute(dto);
      expect(result).toBe(expectedResult);
    });
  });
});
