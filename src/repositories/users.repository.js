import { db } from "../database/database.connection.js";

export function createUserDB(name, email, password) {

    const result = db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
        [name, email, password]
    )
    return result
}

export function getEmailUserDB(email){
    const result = db.query(`SELECT * FROM users where email=$1;`, [email])
    return result
}

