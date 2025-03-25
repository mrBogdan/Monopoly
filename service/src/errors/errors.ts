import { BadRequestError } from './BadRequestError';
import { NotFoundError } from './NotFoundError';
import { ForbiddenError } from './ForbiddenError';
import { MethodNotAllowedError } from './MethodNotAllowedError';

export const errors = [
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  MethodNotAllowedError,
];
