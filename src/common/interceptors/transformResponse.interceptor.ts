import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '@common/http/dto/response.dto';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T, null>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T, null>> {
    return next.handle().pipe(
      map((responseData) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const result: ResponseDto<T, null> = {
          error: null,
          path: request.url,
          data: responseData,
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
        };
        return result;
      }),
    );
  }
}
