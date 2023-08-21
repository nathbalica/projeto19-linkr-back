import { db } from "../database/database.connection.js";

export async function createHashtag(name) {
    try {
        const query = `INSERT INTO hashtags (name) VALUES ($1) RETURNING id`;
        const result = await db.query(query, [name]);
        return result.rows[0].id;
    } catch (error) {
        console.error("Erro ao criar hashtag:", error);
        throw error;
    }
}

export async function getHashtagIdByName(name) {
    try {
        const query = `SELECT id FROM hashtags WHERE name = $1`;
        const result = await db.query(query, [name]);
        return result.rows[0]?.id;
    } catch (error) {
        console.error("Error fetching hashtag ID:", error);
        throw error;
    }
}

export async function getTrendingHashtags() {
    try {
        const query = `
            SELECT hashtags.name, COUNT(post_hashtags.hashtag_id) AS count
            FROM hashtags
            JOIN post_hashtags ON hashtags.id = post_hashtags.hashtag_id
            GROUP BY hashtags.name
            ORDER BY count DESC
            LIMIT 10
        `;
        const result = await db.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching trending hashtags:", error);
        throw error;
    }
}

export async function addPostHashtags(post_id, hashtag_ids) {
    try {
        const values = hashtag_ids
            .map((hashtag_id) => `(${post_id}, ${hashtag_id})`)
            .join(",");
        const query = `INSERT INTO post_hashtags (post_id, hashtag_id) VALUES ${values}`;
        await db.query(query);
    } catch (error) {
        console.error("Error adding post hashtags:", error);
        throw error;
    }
}

export async function getPostsByHashtag(hashtag) {
    try {
        const query = `
            SELECT posts.*
            FROM posts
            JOIN post_hashtags ON posts.id = post_hashtags.post_id
            JOIN hashtags ON post_hashtags.hashtag_id = hashtags.id
            WHERE hashtags.name = $1
            ORDER BY posts.created_at DESC
        `;

        // Add the "#" symbol to the hashtag before querying
        const formattedHashtag = `#${hashtag}`;
        const result = await db.query(query, [formattedHashtag]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching posts by hashtag:", error);
        throw error;
    }
}
