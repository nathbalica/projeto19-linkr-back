import { db } from "../database/database.connection.js";

export function createSessionDB(userId, token) {

    const result = db.query(
        `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
        [userId, token]
    )
    return result
}

export function findSessionDB(token) {
    return db.query(`SELECT "userId" FROM sessions WHERE token=$1;`, [token])
}