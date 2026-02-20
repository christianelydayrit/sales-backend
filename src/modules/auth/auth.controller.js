import verifyUser from "./auth.service.js";

export default async function loginController(req, rep){
    const { username, password } = req.body;
    const user = await verifyUser(req.server.pg, username.trim(), password);

    const accessToken = await rep.jwtSign({ sub: user.id, role: user.role });

    return rep.code(200).send({ accessToken });
}