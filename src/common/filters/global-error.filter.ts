/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from '../enums/error-core.enum.js';
import { responseUtils } from '../utils/response.utils.js';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  private logger = new Logger(GlobalErrorFilter.name);

  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();

    const isPrismaError = error.name?.toLowerCase().includes('prisma');
    let message = error.message;
    if (error['response']?.message) {
      if (Array.isArray(error['response']?.message)) {
        message = error['response']?.message?.pop();
      } else {
        message = error['response']?.message;
      }
    }
    if (isPrismaError) {
      message = message.split('\n').pop() || '';
    }

    let errorCode: string = ErrorCode.INTERNAL_SERVER_ERROR;
    if (!isPrismaError && error.name) {
      errorCode = error.name;
    }

    this.logger.log(error);

    return responseUtils.errorHandler({
      response,
      errorCode,
      statusCode: error['status'] || 500,
      message,
    });
  }
}
