import { InternalServerError } from './InternalServerError';
import { ResponseError } from './ResponseError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorMap = Map<new (...args: any[]) => Error, new (...args: any[]) => ResponseError>;

export const handleBusinessError = (error: unknown, errorMap: ErrorMap): ResponseError => {
  for (const [BusinessError, ResponseError] of errorMap) {
    if (error instanceof BusinessError) {
      return new ResponseError(error.message);
    }
  }

  return new InternalServerError();
};
