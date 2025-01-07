import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ErrorCode } from '../enums/error-core.enum';

@Catch(QueryFailedError)
export class GlobalDBErrorFilter implements ExceptionFilter<QueryFailedError> {
  catch(error: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    response.status(400).json({
      errorCode: ErrorCode.BAD_REQUEST,
      message: error['detail'] || error.message,
    });
  }
}
