import Fastify from "fastify";
import dbConnection from "./plugins/db.js"
import salesController from "./modules/sales/sales.route.js";

export function buildApp(opts = {}){
    const fastify = Fastify({ 
        logger: true,
        ...opts
    });

    fastify.get('/health', async () => ({ status: 'ok' }))
    
    fastify.register(dbConnection);
    fastify.register(salesController, {prefix: '/sales'})

    return fastify;
}


