import verifyUser from "./auth.service.js";

export default async function loginController(req, rep){
    const { username, password } = req.body;

    // Normalize input to avoid whitespace-related login failures.
    const user = await verifyUser(req.server.pg, username.trim(), password);

    /// Issue JWT containing identity (sub) and role claims for protected routes.
    const accessToken = await rep.jwtSign({ sub: user.id, role: user.role });

    return rep.code(200).send({ accessToken });
}