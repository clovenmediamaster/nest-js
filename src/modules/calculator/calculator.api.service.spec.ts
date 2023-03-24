import { CalcDto } from '../../controllers/dto/calculator.dto';
import { BadRequestException } from '@nestjs/common';
import { CalculatorAppService } from './calculator.app.sevice';
import { CalcApiService } from './calculator.api.service';

describe('CalcApiService', () => {
  let service: CalcApiService;
  let appService: CalculatorAppService;

  beforeEach(() => {
    appService = {
      calculate: jest.fn(),
    } as any;
    service = new CalcApiService(appService);
  });

  describe('execute', () => {
    it('should throw BadRequestException when params are invalid', async () => {
      // Arrange
      const dto: CalcDto = { operation: 'addition', param1: 'a', param2: '2' };

      // Act & Assert
      await expect(service.execute(dto)).rejects.toThrow(BadRequestException);
    });

    it('should call appService.calculate with correct params', async () => {
      // Arrange
      const dto: CalcDto = { operation: 'addition', param1: '2', param2: '3' };

      // Act
      await service.execute(dto);

      // Assert
      expect(appService.calculate).toHaveBeenCalledWith(
        'addition',
        2,
        3,
        false,
      );
    });

    it('should return the result of appService.calculate', async () => {
      // Arrange
      const dto: CalcDto = { operation: 'subtract', param1: '5', param2: '3' };
      const expectedResult = 2;
      appService.calculate = jest.fn().mockResolvedValue(expectedResult);

      // Act
      const result = await service.execute(dto);

      // Assert
      expect(result).toBe(expectedResult);
    });
  });
});
