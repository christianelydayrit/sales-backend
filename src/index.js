import 'dotenv/config';
import Fastify from "fastify";
import dbConnection from "./plugins/db.js"
import salesController from "./modules/sales/sales.controller.js";

const fastify = Fastify({ logger: true});

fastify.register(dbConnection);
fastify.register(salesController, {prefix: '/sales'})


const start = async () => {
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
start()