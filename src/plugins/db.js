import pg from "@fastify/postgres";
import fp from "fastify-plugin";

async function dbConnection(fastify){
     fastify.register(pg,{
        connectionString: process.env.DATABASE_URL
    })
}

export default fp(dbConnection);