import { db } from "../database/database.connection.js";

export async function createUserDB(username, email, password, profile_image) {
    const result = await db.query(
      `INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, password, profile_image]
    );
    return result.rows[0];
  }
  
  export async function getEmailUserDB(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result;
  }

