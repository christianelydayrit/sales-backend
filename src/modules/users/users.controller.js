import { fetchUserSales } from "./users.service.js";

export default async function getUserSales(req, rep){
    const { id } = req.params;

    const userSales = await fetchUserSales(req.server.pg, id);

    return rep.code(200).send({data: userSales});
} 