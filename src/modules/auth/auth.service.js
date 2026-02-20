import { InvalidCredentials } from "../../errors/app-error.js";
import argon2 from "argon2";

export default async function verifyUser(pg, username, password){

    const { rows } = await pg.query(
        `SELECT id, username, password_hash, role 
        FROM users 
        WHERE username = $1`
        , [username]);
    
    const user = rows[0];

    if( !user ) throw InvalidCredentials('Invalid credentials');

    const okay = await argon2.verify(user.password_hash, password);

    if( !okay ) throw InvalidCredentials('Invalid credentials');

    return { id: user.id, username: user.username, role: user.role };
}