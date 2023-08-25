import { postComment, getComments } from "../repositories/comments.repository.js";

export async function postCommentController(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;
    const { content } = req.body;
    try {
        const comment = await postComment(user_id, post_id, content);
        console.log(comment);
        res.sendStatus(201);
    } catch (error) {
        console.error("Error publishing comment:", error);
        res.sendStatus(500);
    }
}

export async function getCommentsController(req, res) {
    const { user_id } = res.locals;
    const { post_id } = req.params;
    try {
        const data = await getComments(user_id, post_id);
        return res.json(data);
    } catch (error) {
        console.error("Error fetching comment:", error);
        res.sendStatus(500);
    }
}