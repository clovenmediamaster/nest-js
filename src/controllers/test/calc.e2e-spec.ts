import { Test } from '@nestjs/testing';
import { CalcApiService } from '../../modules/calculator/calculator.api.service';
import { CalcController } from '../calculator.controller';
import { CalculatorAppService } from '../../modules/calculator/calculator.app.sevice';
import { BadRequestException, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('CalcController (E2E)', () => {
  let app: INestApplication;
  let apiService: CalcApiService;
  let appService: CalculatorAppService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      controllers: [CalcController],
      providers: [CalcApiService, CalculatorAppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    apiService = moduleFixture.get<CalcApiService>(CalcApiService);
    appService = moduleFixture.get<CalculatorAppService>(CalculatorAppService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/calc/:operation/:param1/:param2 (GET)', () => {
    it('should return the result of the calculation', async () => {
      const operation = 'subtract';
      const param1 = '5';
      const param2 = '3';
      const expectedResult = 2;
      jest.spyOn(apiService, 'execute').mockResolvedValueOnce(expectedResult);

      console.log('check');

      const response = await request(app.getHttpServer()).get(
        `/calc/${operation}/${param1}/${param2}`,
      );

      expect(response.status).toBe(200);
      expect(response.body).toBe(expectedResult);
      expect(apiService.execute).toHaveBeenCalledWith({
        operation,
        param1,
        param2,
      });
    });

    it('should return a 400 error if the parameters are invalid', async () => {
      const operation = 'add';
      const param1 = 'x';
      const param2 = 'y';
      jest.spyOn(apiService, 'execute').mockImplementationOnce(() => {
        throw new BadRequestException('params are invalid');
      });

      const response = await request(app.getHttpServer()).get(
        `/calc/${operation}/${param1}/${param2}`,
      );

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('params are invalid');
      expect(apiService.execute).toHaveBeenCalledWith({
        operation,
        param1,
        param2,
      });
    });
  });
});
