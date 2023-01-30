import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiResponse,
  getSchemaPath,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { ResponseDto } from '@common/http/dto/response.dto';
import { ErrorDto } from '@common/http/dto/error.dto';

export const ApiErrorResponseWrapper = (options?: ApiResponseOptions) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      ...options,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                nullable: true,
              },
              error: {
                type: 'object',
                $ref: getSchemaPath(ErrorDto),
              },
            },
          },
        ],
      },
    }),
  );
};
