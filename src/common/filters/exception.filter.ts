import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseDto } from '@common/http/dto/response.dto';
import { ENVIRONMENTS } from '@common/constants';
import { LoggerService } from '@common/logger/logger.service';
import { ErrorDto } from '@common/http/dto/error.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status;
    let message = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();
      const exceptionMessage =
        typeof exceptionResponse !== 'string'
          ? exceptionResponse['message']
          : exceptionResponse;

      message = Array.isArray(exceptionMessage)
        ? exceptionMessage.join(', ')
        : exceptionMessage;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const loggerService = new LoggerService('HttpError');
    loggerService.errorWithData(exception, { path: request.url });

    const result: ResponseDto<null, ErrorDto> = {
      data: null,
      error: {
        message,
        stack:
          process.env.NODE_ENV !== ENVIRONMENTS.PRODUCTION
            ? exception.stack
            : '',
      },
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };
    response.status(status).json(result);
  }
}
