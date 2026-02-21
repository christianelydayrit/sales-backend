// Base application error propagated to the global error handler.
export default class AppError extends Error{
    constructor(statusCode, message, name, details = undefined){
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        this.details = details;
    }
}

// Helper factories to create application errors with consistent
// HTTP status codes and names across services/controllers.
export const TokenUnauthorized = (msg, details) =>(new AppError(401, msg, 'Unauthorized', details));
export const InvalidCredentials = (msg, details) =>(new AppError(401, msg, 'Invalid credentials', details));
export const ServiceUnavailableError = (msg, details) =>(new AppError(503, msg, 'Service Unavailable', details));