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

export async function getUserPosts(user_id, user_requesting) {
    const query = `
        SELECT
            p.id,
            p.content,
            p.link,
            p.created_at,
            u.id,
            u.username,
            u.profile_image,
            (
                SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id
            ) AS like_count,
            CASE WHEN EXISTS (
                SELECT 1 FROM likes l WHERE l.user_id = $1 AND l.post_id = p.id
            ) THEN true ELSE false END AS liked,
            CASE WHEN p.user_id = $1 THEN true ELSE false END AS owned
        FROM
            posts p
        JOIN
            users u ON p.user_id = u.id
        WHERE
            p.user_id = $2
        ORDER BY
            p.created_at DESC;
    `;
    const result = await db.query(query, [user_requesting, user_id]);
    return result.rows;
}

export async function getTimeline(user_id) {}


export async function searchUsers(query) {
    try {
        const result = await db.query(
            'SELECT id, username, profile_image FROM users WHERE username ILIKE $1',
            [`%${query}%`]
        );
        return result.rows;
    } catch (error) {
        console.error('Error searching users:', error);
        throw error;
    }
}
