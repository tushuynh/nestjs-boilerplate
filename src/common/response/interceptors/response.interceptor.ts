import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ApiResponseDto } from '../dtos/response.dto';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ApiResponseDto<T>> | Promise<Observable<ApiResponseDto<T>>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: response.statusCode,
          success: response.statusCode >= 200 && response.statusCode < 300,
          message: response.statusMessage || 'Request processed successfully',
          data,
        };
      })
    );
  }
}
