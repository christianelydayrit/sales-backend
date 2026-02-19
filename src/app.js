import Fastify from "fastify";
import dbConnection from "./plugins/db.js"
import salesController from "./modules/sales/sales.route.js";
import errorHandlerPlugin from "./plugins/error-handler.js"

export function buildApp(opts = {}){
    const fastify = Fastify({ 
        logger: true,
        ...opts
    });

    fastify.get('/health', async () => ({ status: 'ok' }));
    
    fastify.register(errorHandlerPlugin);
    fastify.register(dbConnection);
    fastify.register(salesController, {prefix: '/sales'});


    fastify.get('/ready', async (req, rep) => {
        try {
          await fastify.pg.query('SELECT 1')
          return { status: 'ready' }
        } catch {
          return rep.code(503).send({ status: 'not_ready' })
        }
      });

    return fastify;
}


