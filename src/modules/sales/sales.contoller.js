import fetchMonthlySales from './sales.service.js';

export default async function getMonthlySales(req, rep){
    const { month, year } = req.query;
    try{
        const monthlySales = await fetchMonthlySales(req.server.pg, month, year);
        return rep.code(201).send(monthlySales);;
    }catch(err){
        return rep.code(500).send({ error: 'Database error' });
    }
}