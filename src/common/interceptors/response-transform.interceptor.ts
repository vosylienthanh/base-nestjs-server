import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponseData } from '../interfaces/response-data.interface.js';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, IResponseData<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponseData<T>> {
    return next.handle().pipe(map((data: T) => ({ data: data })));
  }
}
