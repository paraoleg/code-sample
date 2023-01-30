import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExtraModels, ApiHeader, ApiTags } from '@nestjs/swagger';
import { HealthCheckResponseDto } from './dto/health-check.response.dto';
import { ApiResponseWrapper } from '@common/http/wrappers/apiResponseWrapper';
import { ApiErrorResponseWrapper } from '@common/http/wrappers/apiErrorResponseWrapper';
import { BaseController } from '@common/base.controller';

const PREFIX = 'health-check';
const HEADER_NAME = 'Application-health-secret';

@ApiTags(PREFIX)
@Controller(PREFIX)
@ApiExtraModels(HealthCheckResponseDto)
export class HealthCheckController extends BaseController {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  @Get()
  @ApiHeader({ name: HEADER_NAME })
  @ApiResponseWrapper(HealthCheckResponseDto)
  @ApiErrorResponseWrapper({ status: HttpStatus.BAD_REQUEST })
  getHealthInfo(
    @Headers(HEADER_NAME) healthSecretHeader: string,
  ): HealthCheckResponseDto {
    const secret = this.configService.get<string>('HEALTH_CHECK_SECRET');

    if (!healthSecretHeader || healthSecretHeader !== secret) {
      throw new BadRequestException('Incoming secret is not valid');
    }

    return { everythingIsFine: true };
  }
}
