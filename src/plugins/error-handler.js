import fp from "fastify-plugin";
import AppError from "../errors/app-error.js";

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
                error: err.name,
                message: err.message,
                ...(err.details !== undefined ? {details: err.details} : {})
            })
        }

        if(err.validation){
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

        req.log.error(err);
        return rep.code(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'An unexpected error occured'
        })
    })
}

export default fp(errorHandlerPlugin);