import { salesMonthlySchema } from './sales.schema.js'
import getMonthlySales from './sales.controller.js';

export default async function salesRouter(fastify){

    // Protected route: returns paginated monthly sales for authenticated clients.
    fastify.get(
        '/', 
        {onRequest: [fastify.authenticate], schema: salesMonthlySchema}, 
        getMonthlySales
    )
};