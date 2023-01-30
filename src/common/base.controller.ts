import { ApiExtraModels } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from '@common/http/dto/response.dto';
import { ErrorDto } from '@common/http/dto/error.dto';
import { ApiErrorResponseWrapper } from '@common/http/wrappers/apiErrorResponseWrapper';

@ApiExtraModels(ResponseDto)
@ApiExtraModels(ErrorDto)
@ApiErrorResponseWrapper({ status: HttpStatus.INTERNAL_SERVER_ERROR })
export class BaseController {}
