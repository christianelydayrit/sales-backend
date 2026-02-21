import jwt from "@fastify/jwt";
import fp from "fastify-plugin";
import { TokenUnauthorized } from "../errors/app-error.js"

async function authPlugin(fastify){
    // Registers JWT methods (req.jwtVerify / rep.jwtSign)
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET,
        sign: {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    });

    // Route guard: verifies token and attaches decoded payload to req.user
    fastify.decorate('authenticate', async (req, rep) =>{
        try{
            await req.jwtVerify();
        }catch{
            // Do not expose verification reason (expired, malformed, etc.)
            throw TokenUnauthorized('Unauthorized access');
        }
    })
}

export default fp(authPlugin);