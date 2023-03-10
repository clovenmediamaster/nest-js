import { HttpException, HttpStatus } from '@nestjs/common';
import * as Joi from 'joi';

const paramsSchema = Joi.object({
  param1: Joi.number().required(),
  param2: Joi.number().required(),
});

export function validateParams(param1: any, param2: any) {
  param1 = parseInt(param1);
  param2 = parseInt(param2);
  const { error } = paramsSchema.validate({ param1, param2 });
  if (error || param2 === undefined) {
    throw new HttpException(
      'Please check both values. They must be numbers',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export function checkResult(result, param1, param2): any {
  if (result > 1000000000 || result < -1000000000) {
    throw new HttpException(
      'The result cannot be more than 1 000 000 000 or less than -1 000 000 000',
      HttpStatus.BAD_REQUEST,
    );
  }
  return {
    param1,
    param2,
    result,
    date_created: new Date(),
    status: 'OK',
  };
}
