import Fastify from "fastify";
import dbConnection from "./plugins/db.js";
import salesRouter from "./modules/sales/sales.route.js";
import errorHandlerPlugin from "./plugins/error-handler.js"
import authPlugin from "./plugins/auth.js";
import { ServiceUnavailableError } from "./errors/app-error.js";
import authRoutes from "./modules/auth/auth.route.js";
import userRoute from "./modules/users/users.route.js";

export function buildApp(opts = {}){

    // Create application instance. Options allow test environments to override config.
    const fastify = Fastify({ 
        logger: true,
        ...opts
    });

    // Liveness probe: confirms the process is running.
    fastify.get('/health', async () => ({ status: 'ok' }));
    
    /**
     * Plugin registration order:
     * - register infrastructure plugins (error handling, db, auth) before routes
     * - routes rely on `fastify.pg` and (for protected routes) `fastify.authenticate`
     */

    fastify.register(errorHandlerPlugin);
    fastify.register(dbConnection);
    fastify.register(authPlugin);

    // Public auth endpoints
    fastify.register(authRoutes, {prefix: '/auth'});
    
    // Protected business routes
    fastify.register(salesRouter, {prefix: '/sales'});
    fastify.register(userRoute, {prefix: '/user'});
    
    // Readiness probe: verifies the database is reachable.
    fastify.get('/ready', async (req, rep) => {
        try {
          await fastify.pg.query('SELECT 1')
          return { 
            status: 'ready' 
        }
        } catch {
            throw ServiceUnavailableError('Database unavailable');
        }
      });

    return fastify;
}


