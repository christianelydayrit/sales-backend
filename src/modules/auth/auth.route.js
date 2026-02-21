import { authSchema } from './auth.schema.js';
import loginController from './auth.controller.js';

export default async function authRoutes(fastify){
    // Login route is intentionally unauthenticated.
    fastify.post('/login', {schema: authSchema}, loginController)
}