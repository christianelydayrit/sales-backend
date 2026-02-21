import pg from "@fastify/postgres";
import fp from "fastify-plugin";

/**
 * PostgreSQL plugin registration.
 * Centralizes database configuration and ensures it is registered once
 * using fastify-plugin so it can be shared across the application.
 */

async function dbConnection(fastify){
     fastify.register(pg,{
        connectionString: process.env.DATABASE_URL
    })
}

export default fp(dbConnection);