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

export async function editPost(user_id, content, post_id) {
    try {
        const query = `UPDATE posts SET content = $1 WHERE id = $2 AND user_id = $3`;
        const result = await db.query(query, [content, post_id, user_id]);
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
        const query = `SELECT user_id FROM posts WHERE id = $1`;
        const result = await db.query(query, [post_id]);
        if (result.rowCount === 0 || result.rows[0].user_id !== user_id) {
            throw new Error(
                "Post não encontrado ou você não tem permissão para deletá-lo."
            );
        } else {
            const likesQuery = `DELETE FROM likes WHERE post_id = $1`;
            await db.query(likesQuery, [post_id]);

            const postQuery = `DELETE FROM posts WHERE id = $1`;
            await db.query(postQuery, [post_id]);
        }
    } catch (error) {
        throw error;
    }
}

export async function checkIfLiked(user_id, post_id) {
    const search = `
            SELECT id FROM posts WHERE id = $1
        `;
    const exists = await db.query(search, [post_id]);
    if (exists.rows.length === 0) {
        throw new Error("Post não encontrado.");
    }
    const query = `
        SELECT EXISTS (
            SELECT 1
            FROM likes
            WHERE user_id = $1 AND post_id = $2
        ) AS liked
    `;
    const result = await db.query(query, [user_id, post_id]);
    return result.rows[0].liked;
}

export async function addLike(user_id, post_id) {
    try {
        const query = `
            INSERT INTO likes (user_id, post_id)
            VALUES ($1, $2)
        `;
        const result = await db.query(query, [user_id, post_id]);
    } catch (error) {
        throw error;
    }
}

export async function removeLike(user_id, post_id) {
    try {
        const query = `DELETE FROM likes WHERE user_id = $1 AND post_id = $2`;
        const result = await db.query(query, [user_id, post_id]);
        if (result.rowCount === 0) {
            throw new Error(
                "Post não encontrado ou você não pode descurti-lo."
            );
        }
    } catch (error) {
        throw error;
    }
}
