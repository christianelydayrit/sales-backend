export default class AppError extends Error{
    constructor(statusCode, message, name, details = undefined){
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.details = details;
    }
}

export const NotFoundError = (msg, details) =>(new AppError(404, msg, 'Not found', details));
export const ServiceUnavailableError = (msg, details) =>(new AppError(503, msg, 'Service Unavailable', details));