import { ApiProperty } from '@nestjs/swagger';
import { IError } from '@common/http/interface/error.interface';

export class ErrorDto implements IError {
  @ApiProperty({ type: 'string' })
  message: string;

  @ApiProperty({ type: 'string', nullable: true })
  stack?: string;

  @ApiProperty({ type: 'object', nullable: true })
  additionalData?: Record<string, any>;
}
