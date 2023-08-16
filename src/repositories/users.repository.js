import { db } from "../database/database.connection.js";

export async function createUserDB(name, email, password, profile_image) {
    const result = await db.query(
      `INSERT INTO Users (name, email, password, profile_image) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, profile_image]
    );
    return result.rows[0];
  }
  
  export async function getEmailUserDB(email) {
    const result = await db.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    return result;
  }

