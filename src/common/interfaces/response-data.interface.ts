import { ErrorCode } from '../enums/error-core.enum.js';

export interface IResponseData<T> {
  errorCode?: ErrorCode | string;
  data?: T;
  message?: string;
  errorDetails?: unknown;
}
