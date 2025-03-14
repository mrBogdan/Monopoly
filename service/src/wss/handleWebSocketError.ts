import { errors } from '../errors/errors';
import { errorMapper } from '../errorMapper';
import { InternalServerError } from '../errors/InternalServerError';
import { ResponseError } from '../errors/ResponseError';

const prepareResponseError = (error: ResponseError): string => {
    return JSON.stringify({
        message: error.message,
        status: error.status,
        reason: error.reason,
    });
}


export const handleWebSocketError = (error: unknown): string => {
    for (const ResponseError of errors) {
        if (error instanceof ResponseError) {
            return prepareResponseError(error);
        }
    }

    for (const [BusinessError, ResponseError] of errorMapper) {
        if (error instanceof BusinessError) {
            const responseError = new ResponseError(error.message);
            return prepareResponseError(responseError);
        }
    }

    const internalServerError = new InternalServerError();
    return prepareResponseError(internalServerError);
}
