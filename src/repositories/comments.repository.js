
import { db } from "../database/database.connection.js";

export async function postComment(user_id, post_id, content) {
    try {
        const query = `
            INSERT INTO comments (post_id, commenter_id, content)
            VALUES ($1, $2, $3)
            RETURNING id, commenter_id, content, created_at;
        `
        const result = await db.query(query, [post_id, user_id, content]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export async function getComments(user_id, post_id) {
    try {
        const query = `
        SELECT
            c.id,
            c.commenter_id,
            c.content,
            c.created_at,
            u.username AS commenter_name,
            u.profile_image AS commenter_profile_image,
            CASE WHEN c.commenter_id = p.user_id THEN true ELSE false END AS owner,
            CASE WHEN uf.follower_id IS NOT NULL THEN true ELSE false END AS followed
        FROM
            comments c
        LEFT JOIN
            user_following uf ON c.commenter_id = uf.following_id AND uf.follower_id = $1
        JOIN
            posts p ON c.post_id = p.id
        JOIN
            users u ON c.commenter_id = u.id -- Join with users table to get commenter's info
        WHERE
            c.post_id = $2;
        `;
        const result = await db.query(query, [user_id, post_id]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}