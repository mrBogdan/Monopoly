import { ResponseError } from './ResponseError';

export const toJsonError = (error: ResponseError): string => {
  return JSON.stringify({
    message: error.message,
    status: error.status,
    reason: error.reason,
  });
}
