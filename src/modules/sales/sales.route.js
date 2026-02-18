import { salesMonthlySchema } from './sales.schema.js'
import getMonthlySales from './sales.contoller.js';

export default function salesController(fastify){
    fastify.get('/monthly', {schema: salesMonthlySchema}, getMonthlySales)
};