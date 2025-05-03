import { BadRequestError } from './BadRequestError';
import { ForbiddenError } from './ForbiddenError';
import { MethodNotAllowedError } from './MethodNotAllowedError';
import { NotFoundError } from './NotFoundError';

export const errors = [
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  MethodNotAllowedError,
];
