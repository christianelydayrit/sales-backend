import fetchMonthlySales from './sales.service.js';

export default async function getMonthlySales(req, rep){
    const { month, year, page, pageSize } = req.query;
    const monthlySales = await fetchMonthlySales(req.server.pg, month, year, page, pageSize);
    return rep.code(200).send(monthlySales);
}