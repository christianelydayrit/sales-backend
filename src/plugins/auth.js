import jwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { TokenUnauthorized } from "../errors/app-error.js"

async function authPlugin(fastify){
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET,
        sign: {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    });

    fastify.decorate('authenticate', async (req, rep) =>{
        try{
            await req.jwtVerify();
        }catch(err){
            throw TokenUnauthorized(err.message);
        }
    })
}

export default fp(authPlugin);