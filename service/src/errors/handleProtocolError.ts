import { errors } from './errors';
import { ResponseError } from './ResponseError';

export const handleProtocolError = (error: unknown): ResponseError | undefined => {
  for (const ResponseError of errors) {
    if (error instanceof ResponseError) {
      return error;
    }
  }
}
