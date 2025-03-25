import { ResponseError } from './ResponseError';
import { errors } from './errors';

export const handleProtocolError = (error: unknown): ResponseError | undefined => {
  for (const ResponseError of errors) {
    if (error instanceof ResponseError) {
      return error;
    }
  }
}
