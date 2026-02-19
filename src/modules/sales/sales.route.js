import { salesMonthlySchema } from './sales.schema.js'
import getMonthlySales from './sales.controller.js';

export default async function salesController(fastify){
    fastify.get('/', {schema: salesMonthlySchema}, getMonthlySales)
};