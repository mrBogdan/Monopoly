import { BadRequestError } from './BadRequestError';
import { NotFoundError } from './NotFoundError';
import { ForbiddenError } from './ForbiddenError';

export const errors = [
    BadRequestError,
    NotFoundError,
    ForbiddenError,
];
