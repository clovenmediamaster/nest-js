import { Test, TestingModule } from '@nestjs/testing';
import { CalcController } from '../../../controllers/calculator.controller'; 
import { CalcApiService } from '../../../modules/calculator/calculator.api.service'; 

describe('CalcController', () => {
  // Оголошуємо змінні, які будуть використовуватися в тестах
  let controller: CalcController;
  let service: CalcApiService;

  beforeEach(async () => {
    // Створюємо тестовий модуль NestJS
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalcController], // Реєструємо контролер
      providers: [
        {
          provide: CalcApiService,
          useValue: {
            execute: jest.fn(), // Замінюємо реальний метод execute на фіктивний
          },
        },
      ],
    }).compile(); //модуль стає готовим до запуску тестів

    // Отримуємо екземпляри контролера та сервісу з тестового модуля
    controller = module.get<CalcController>(CalcController);
    service = module.get<CalcApiService>(CalcApiService);
  });

  // Група тестів для методу operate
  describe('operate', () => {
    afterEach(() => {
      jest.clearAllMocks(); // clear data
    });

    it('should return the result of executing the addition operation with the provided parameters', async () => {
      // Визначаємо очікуваний результат виконання методу execute
      const expectedResult = 10;
      // Замінюємо реальний метод execute на фіктивний і повертаємо очікуваний результат
      jest.spyOn(service, 'execute').mockResolvedValue(expectedResult);

      // Визначаємо параметри операції
      const operation = 'addition';
      const param1 = '5';
      const param2 = '5';

      // Викликаємо метод operate контролера з заданими параметрами і отримуємо результат
      const result = await controller.operate({ operation, param1, param2 });

      // Перевіряємо, що результат виконання методу відповідає очікуваному
      expect(result).toBe(expectedResult);
      // Перевіряємо, що метод execute був викликаний з правильними аргументами
      expect(service.execute).toHaveBeenCalledWith({
        operation,
        param1,
        param2,
      });
    });
  }); // кількість повторень = 5;
});
