import { db } from "../database/database.connection.js";

export async function createUserDB(username, email, password, profile_image) {
    const result = await db.query(
        `INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4) RETURNING *`,
        [username, email, password, profile_image]
    );
    return result.rows[0];
}

export async function getEmailUserDB(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
        email,
    ]);
    return result;
}

export async function getUserData(user_id) {
    const query = `
    SELECT
        username,
        profile_image
    FROM
        users
    WHERE
        id=$1
    `;
    const result = await db.query(query, [user_id]);
    return result.rows[0];
}

export async function getUserPosts(user_id) {
    const query = `
        SELECT
            p.content,
            p.link,
            p.created_at,
            u.username,
            u.profile_image,
            COALESCE(SUM(CASE WHEN l.user_id = $1 THEN 1 ELSE 0 END), 0) AS like_count,
            CASE WHEN l.user_id = $1 THEN true ELSE false END AS liked
        FROM
            posts p
        JOIN
            users u ON p.user_id = u.id
        LEFT JOIN
            likes l ON p.id = l.post_id
        WHERE
            p.user_id = $1
        GROUP BY
            p.id, u.username, u.profile_image, l.user_id
        ORDER BY
            p.created_at DESC;
    `;
    const result = await db.query(query, [user_id]);
    return result.rows;
}

export async function getTimeline(user_id) {}
