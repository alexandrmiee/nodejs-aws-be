export enum RESPONSE_CODES {
    SUCCESS = 200,
    SAVED = 201,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    SERVER_ERROR = 500,
}

export const RESPONSE_MESSAGES = {
    [RESPONSE_CODES.NOT_FOUND]: 'Not found',
    [RESPONSE_CODES.SERVER_ERROR]: 'Server Error',
    [RESPONSE_CODES.BAD_REQUEST]: 'Bad request',
    [RESPONSE_CODES.SAVED]: 'Saved',
}

export const CORS = {
    origins: '*',
    headers: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
    ]
};