import { NotAllowedJoiningError } from './NotAllowedJoiningError';
import { ForbiddenError } from './errors/ForbiddenError';
import { ResponseError } from './errors/ResponseError';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorMapper: Map<new (...args: any[]) => Error, new (...args: any[]) => ResponseError> = new Map([
  [NotAllowedJoiningError, ForbiddenError]
]);
