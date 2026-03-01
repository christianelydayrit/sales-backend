import { usersShema } from "./users.schema.js";
import getUserSales from "./users.controller.js";

export default  async function userRoute(fastify){
    fastify.get('/:id', {onRequest: fastify.authenticate, schema: usersShema}, getUserSales);
}  