import {
    createHashtag,
    addPostHashtags,
} from "../repositories/hashtags.repository.js";
import {
    addPost,
    editPost,
    removePost
} from "../repositories/posts.repository.js";

import { db } from "../database/database.connection.js";

export async function publish(req, res) {
    const { user_id } = res.locals;
    const { content, link } = req.body;
    try {
        const post_id = await addPost(user_id, content, link);
        const hashtags = content.match(/#\w+/g);
        if (hashtags) {
            const hashtagIds = await processHashtags(hashtags);
            await addPostHashtags(post_id, hashtagIds);
        }
        return res.sendStatus(201);
    } catch (error) {
        console.error("Erro ao publicar post:", error);
        res.sendStatus(500);
    }
}

async function processHashtags(hashtags) {
    const normalizedHashtags = hashtags.map(hashtag => hashtag.toLowerCase());
    const existingHashtags = await getExistingHashtags(normalizedHashtags);
    const newHashtags = await createNonExistingHashtags(normalizedHashtags, existingHashtags);
    return [...existingHashtags, ...newHashtags];
}

async function getExistingHashtags(hashtags) {
    const query = `SELECT id, name FROM hashtags WHERE name IN ($1)`;
    const result = await db.query(query, [hashtags]);
    return result.rows.map(row => row.id);
}

async function createNonExistingHashtags(hashtags, existingHashtags) {
    const nonExistingHashtags = hashtags.filter(hashtag => !existingHashtags.includes(hashtag));
    const newHashtagIds = [];
    for (const hashtag of nonExistingHashtags) {
        const hashtagId = await createHashtag(hashtag);
        newHashtagIds.push(hashtagId);
    }
    return newHashtagIds;
}


export async function editPostController(req, res) {
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

export async function removePostController(req, res) {
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