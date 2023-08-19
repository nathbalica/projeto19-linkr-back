import { db } from "../database/database.connection.js";


export async function addPost(user_id, content, link) {
    try {
        const query = `INSERT INTO posts (user_id, content, link) VALUES ($1, $2, $3) RETURNING id`;
        const result = await db.query(query, [user_id, content, link]);
        return result.rows[0].id;
    } catch (error) {
        throw error;
    }
}

export async function editPost(user_id, content, link, post_id) {
    try {
        const query = `UPDATE posts SET content = $1, link = $2 WHERE id = $3 AND user_id = $4`;
        const result = await db.query(query, [content, link, post_id, user_id]);
        if (result.rowCount === 0) {
            throw new Error(
                "Post não encontrado ou você não tem permissão para editá-lo."
            );
        }
    } catch (error) {
        throw error;
    }
}

export async function removePost(user_id, post_id) {
    try {
        const query = `DELETE FROM posts WHERE id = $1 AND user_id = $2`;
        const result = await db.query(query, [post_id, user_id]);
        if (result.rowCount === 0) {
            throw new Error(
                "Post não encontrado ou você não tem permissão para deletá-lo."
            );
        }
    } catch (error) {
        throw error;
    }
}
