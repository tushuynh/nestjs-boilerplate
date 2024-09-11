import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseSanitizationInterceptor<T> implements NestInterceptor<T> {
  readonly omittedProperties = ['password'];

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    return next.handle().pipe(map((data) => this.sanitizeProperties(data)));
  }

  private sanitizeProperties(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeProperties(item));
    }

    if (typeof data === 'object' && data !== null) {
      if (data instanceof Date) {
        return data;
      }

      const sanitizedData = {};
      for (const key in data) {
        if (!this.omittedProperties.includes(key)) {
          sanitizedData[key] = this.sanitizeProperties(data[key]);
        }
      }

      return sanitizedData;
    }

    return data;
  }
}
