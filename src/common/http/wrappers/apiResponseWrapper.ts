import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiResponse,
  getSchemaPath,
  ApiResponseOptions,
} from '@nestjs/swagger';
import { ResponseDto } from '@common/http/dto/response.dto';

export const ApiResponseWrapper = <TModel extends Type>(
  model: TModel,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiResponse({
      status: HttpStatus.OK,
      ...options,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            type: 'object',
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
              error: {
                type: 'object',
                nullable: true,
              },
            },
          },
        ],
      },
    }),
  );
};
