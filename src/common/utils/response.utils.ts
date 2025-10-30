import { Response } from 'express';
import { ErrorCode } from '../enums/error-core.enum.js';
import { IResponseData } from '../interfaces/response-data.interface.js';

class ResponseUtils {
  successResponse = <T>(data: T): IResponseData<T> => {
    const responseData: IResponseData<T> = {
      data,
    };

    return responseData;
  };

  unauthorizedHandler = <T>(res: Response, errorDetails?: unknown) => {
    const responseData: IResponseData<T> = {
      errorCode: ErrorCode.UNAUTHORIZED,
      errorDetails,
    };

    return res.status(401).json(responseData);
  };

  badRequestHandler = <T>(res: Response, errorDetails?: unknown) => {
    const responseData: IResponseData<T> = {
      errorCode: ErrorCode.BAD_REQUEST,
      errorDetails,
    };

    return res.status(401).json(responseData);
  };

  errorHandler = <T>({
    response,
    statusCode,
    errorCode,
    errorDetails,
    message,
  }: {
    response: Response;
    statusCode: number;
    errorCode: ErrorCode | string;
    errorDetails?: unknown;
    message?: string;
  }) => {
    const responseData: IResponseData<T> = {
      errorCode,
      errorDetails,
      message,
    };

    return response.status(statusCode).json(responseData);
  };
}

export const responseUtils = new ResponseUtils();
