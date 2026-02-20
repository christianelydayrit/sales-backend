export default class AppError extends Error{
    constructor(statusCode, message, name, details = undefined){
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.details = details;
    }
}

export const TokenUnauthorized = (msg, details) =>(new AppError(401, msg, 'Unauthorized', details));
export const InvalidCredentials = (msg, details) =>(new AppError(401, msg, 'Invalid credentials', details));
export const ServiceUnavailableError = (msg, details) =>(new AppError(503, msg, 'Service Unavailable', details));