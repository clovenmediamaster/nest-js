import { HttpException, HttpStatus } from '@nestjs/common';
import * as Joi from 'joi';

const paramsSchema = Joi.object({
  param1: Joi.number().required(),
  param2: Joi.number().required(),
});

export function validateParams(param1: any, param2: any) {
  const { error } = paramsSchema.validate({ param1, param2 });
  if (error || param2 === undefined) {
    throw new HttpException(
      'Please check both values. They must be numbers',
      HttpStatus.BAD_REQUEST,
    );
  }
}
