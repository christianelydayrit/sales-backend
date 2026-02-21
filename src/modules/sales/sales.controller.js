import fetchMonthlySales from './sales.service.js';

export default async function getMonthlySales(req, rep){
    const { month, year, page = 1, pageSize = 50 } = req.query;

    // Delegates filtering + pagination logic to the service layer.
    const monthlySales = await fetchMonthlySales(
        req.server.pg, 
        month, 
        year, 
        page, 
        pageSize
    );

    return rep.code(200).send(monthlySales);
}