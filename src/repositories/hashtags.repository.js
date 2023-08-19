import { db } from "../database/database.connection.js";

export async function createHashtag(name) {
    try {
        const query = `INSERT INTO hashtags (name) VALUES $1 RETURNING id`;
        const result = await db.query(query, [name]);
        return result.rows[0].id;
    } catch (error) {
        console.error("Erro ao criar hashtag:", error);
        return res.sendStatus(500);
    }
}

export async function addPostHashtags(post_id, hashtag_id) {
    try {
        const query = `INSERT INTO post_hashtags (post_id, hashtag_id) VALUES ($1, $2)`;
        await db.query(query, [post_id, hashtag_id]);
    } catch (error) {
        console.error("Erro ao adicionar hashtags de um post:", error);
        return res.sendStatus(500);
    }
}
