import {
    createHashtag,
    addPostHashtags,
} from "../repositories/hashtags.repository.js";
import {
    addPost,
    editPost,
    removePost,
} from "../repositories/posts.repository.js";

import { db } from "../database/database.connection.js";

export async function publish(req, res) {
    const { user_id } = res.locals;
    const { content, link } = req.body;
    try {
        const post_id = await addPost(user_id, content, link);
        const hashtags = content.match(/#\w+/g);
        if (hashtags) {
            for (const hashtag of hashtags) {
                const normalized = hashtag.toLowerCase();
                const exists = await db.query(
                    `SELECT id FROM hashtags WHERE name = $1`,
                    [normalized]
                );
                let hashtag_id;
                if (exists.rows.length === 0) {
                    hashtag_id = await createHashtag(normalized);
                } else {
                    hashtag_id = exists.rows[0].id;
                }
                await addPostHashtags(post_id, hashtag_id);
            }
        }
        return res.sendStatus(201);
    } catch (error) {
        console.error("Erro ao publicar post:", error);
        res.sendStatus(500);
    }
}

export async function edit(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;
    const { content, link } = req.body;

    try {
        await editPost(user_id, content, link, post_id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}

export async function remove(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;

    try {
        await removePost(user_id, post_id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}
