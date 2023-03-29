import { HttpException, HttpStatus } from '@nestjs/common';

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
