import fetchMonthlySales from './sales.service.js';

export default async function getMonthlySales(req, rep){
    const { month, year } = req.query;
    const monthlySales = await fetchMonthlySales(req.server.pg, month, year);
    return rep.code(200).send(monthlySales);
}