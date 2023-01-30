import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '@common/http/interface/response.interface';

export class ResponseDto<TData, EData> implements IResponse<TData, EData> {
  @ApiProperty({ type: 'string', example: '/api/v1/health-check' })
  path: string;

  @ApiProperty({ type: 'number', example: 200 })
  statusCode: HttpStatus;

  @ApiProperty({ type: 'string', example: '2021-11-16T16:40:47.881Z' })
  timestamp: string;

  data: TData | null;

  error: EData;
}
