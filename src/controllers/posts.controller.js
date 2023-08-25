import {
    addPost,
    editPost,
    removePost,
    addLike,
    removeLike,
    checkIfLiked,
    removeHashtags,
    sharePost
} from "../repositories/posts.repository.js";
import { createPostHashtags } from "./hashtags.controller.js";

export async function publish(req, res) {
    const { user_id } = res.locals;
    const { content, link } = req.body;
    try {
        const post_id = await addPost(user_id, content, link);
        const hashtags = content.match(/#\w+/g);
        if (hashtags) {
            await createPostHashtags(post_id, hashtags);
        }
        res.sendStatus(201);
    } catch (error) {
        console.error("Error publishing post:", error);
        res.sendStatus(500);
    }
}

export async function editPostController(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;
    const { content } = req.body;

    try {
        await removeHashtags(post_id);
        const hashtags = content.match(/#\w+/g);
        if (hashtags) {
            await createPostHashtags(post_id, hashtags);
        }
        await editPost(user_id, content, post_id);
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
        await removeHashtags(post_id);
        await removePost(user_id, post_id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}

export async function likeController(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;
    try {
        const isLiked = await checkIfLiked(user_id, post_id);
        if (!isLiked) {
            const result = await addLike(user_id, post_id);
            res.status(200).send(result);
        } else {
            return res.status(409).send("Post já foi curtido.");
        }
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}

export async function dislikeController(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;

    try {
        const isLiked = await checkIfLiked(user_id, post_id);
        if (isLiked) {
            const result = await removeLike(user_id, post_id);
            res.status(200).send(result);
        } else {
            return res.status(409).send("Post não está curtido.");
        }
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}

export async function sharePostController(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;

    try {
        await sharePost(user_id, post_id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao editar post:", error);
        res.sendStatus(500);
    }
}