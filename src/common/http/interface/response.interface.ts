import { HttpStatus } from '@nestjs/common';

export interface IResponse<T, E> {
  data: T;
  path: string;
  error: E;
  timestamp: string;
  statusCode: HttpStatus;
}
