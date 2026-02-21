import fp from "fastify-plugin";
import AppError from "../errors/app-error.js";

/**
 * Central error translator: converts thrown errors into
 * standardized HTTP responses for the API contract.
 */


async function errorHandlerPlugin(fastify){

    fastify.setNotFoundHandler((req, rep) => {
        return rep.code(404).send({
            statusCode: 404,
            error: 'Not Found',
            message: `Route ${req.method} ${req.url} not found`
        })
    })

    fastify.setErrorHandler((err, req, rep) =>{

        
        if(err instanceof AppError){
            return rep.code(err.statusCode).send({
                statusCode: err.statusCode,
                error: err.error,
                message: err.message,
                ...(err.details !== undefined ? {details: err.details} : {})
            })
        }

        // Fastify content-type / parsing errors
        if (err.code === "FST_ERR_CTP_INVALID_JSON_BODY") {
            return rep.code(400).send({
              statusCode: 400,
              error: "Bad Request",
              message: "Invalid JSON body",
            });
        }

        if (err.code === "FST_ERR_CTP_INVALID_MEDIA_TYPE") {
            return rep.code(415).send({
                statusCode: 415,
                error: "Unsupported Media Type",
                message: "Content-Type must be application/json",
            });
        }

        // Fastify validation errors
        if(err.code === "FST_ERR_VALIDATION"){
            return rep.code(400).send({
                statusCode: 400,
                error: 'Bad Request',
                message: "Validation failed",
                details: err.validation?.map((e) =>({
                    field: e.instancePath || e.schemaPath,
                    message: e.message
                }))
            })
        }

        // Unknown or unexpected runtime errors 
        req.log.error(err);
        return rep.code(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An unexpected error occurred'
        })
    })
}

export default fp(errorHandlerPlugin);