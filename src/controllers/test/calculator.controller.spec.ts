// import { HttpException, HttpStatus } from '@nestjs/common';
// import { CalculatorMainService } from 'src/modules/calculator/calculator.main.service';
// import { CalculatorAppService } from 'src/modules/calculator/calculator.app.sevice';

// describe('CalculatorAppService', () => {
//   let calculatorAppService: CalculatorAppService;
//   let mainService: CalculatorMainService;

//   beforeEach(() => {
//     calculatorAppService = new CalculatorAppService(mainService);
//   });

//   describe('calculate', () => {
//     it('should return correct result for addition', async () => {
//       const result = await calculatorAppService.calculate('addition', 2, 3);
//       expect(result).toBe(5);
//     });

//     it('should return correct result for subtraction', async () => {
//       const result = await calculatorAppService.calculate('subtract', 5, 3);
//       expect(result).toBe(2);
//     });

//     it('should return correct result for multiplication', async () => {
//       const result = await calculatorAppService.calculate('multiply', 2, 3);
//       expect(result).toBe(6);
//     });

//     it('should return correct result for division', async () => {
//       const result = await calculatorAppService.calculate('divide', 10, 2);
//       expect(result).toBe(5);
//     });

//     it('should throw error when dividing by zero', async () => {
//       await expect(
//         calculatorAppService.calculate('divide', 10, 0),
//       ).rejects.toThrow(
//         new HttpException('Cannot divide by zero', HttpStatus.BAD_REQUEST),
//       );
//     });

//     it('should throw error for invalid operation', async () => {
//       await expect(
//         calculatorAppService.calculate('invalid', 2, 3),
//       ).rejects.toThrow(
//         new HttpException('Invalid operation: invalid', HttpStatus.BAD_REQUEST),
//       );
//     });
//     // it('should throw error for invalid input values', async () => {
//     //   await expect(
//     //     calculatorAppService.calculate('addition', 2, 'a'),
//     //   ).rejects.toThrow(
//     //     new HttpException('Invalid input values', HttpStatus.BAD_REQUEST),
//     //   );
//     // });

//     // it('should return correct result for large numbers', async () => {
//     //   const result = await calculatorAppService.calculate(
//     //     'multiply',
//     //     123456789,
//     //     987654321,
//     //   );
//     //   expect(result).toBe(121932631137021009);
//     // });

//     it('should return correct result for negative numbers', async () => {
//       const result = await calculatorAppService.calculate('addition', -2, 3);
//       expect(result).toBe(1);
//     });
//   });
// });

//
//
//
//
//

import { Test, TestingModule } from '@nestjs/testing';
import { CalcController } from '../calculator.controller';
import { CalcApiService } from '../../modules/calculator/calculator.api.service';

describe('CalcController', () => {
  let controller: CalcController;
  let service: CalcApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalcController],
      providers: [
        {
          provide: CalcApiService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CalcController>(CalcController);
    service = module.get<CalcApiService>(CalcApiService);
  });

  describe('operate', () => {
    it('should return the result of executing the addition operation with the provided parameters', async () => {
      const expectedResult = 10;
      jest.spyOn(service, 'execute').mockResolvedValue(expectedResult);

      const operation = 'addition';
      const param1 = '5';
      const param2 = '5';

      const result = await controller.operate({ operation, param1, param2 });

      expect(result).toBe(expectedResult);
      expect(service.execute).toHaveBeenCalledWith({
        operation,
        param1,
        param2,
      });
    });
  });
});
