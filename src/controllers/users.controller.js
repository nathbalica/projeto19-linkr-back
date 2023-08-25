import {
    getUserData,
    getUserPosts,
    searchUsers,
    getTimelineDB,
} from "../repositories/users.repository.js";
import { db } from "../database/database.connection.js";

export async function getUserById(req, res) {
    const { user_id } = req.params;
    const user_requesting = res.locals.user_id;
    try {
        const user = await getUserData(user_id);
        const posts = await getUserPosts(user_id, user_requesting);
        const responseObj = {
            ...user,
            posts,
        };
        return res.json(responseObj);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.sendStatus(500);
    }
}

export async function getTimeline(req, res) {
    const { user_id } = res.locals;
    const { page } = req.params;
    const limit = 10 * page;
    try {
        const timeline = await getTimelineDB(user_id, limit);
        return res.json(timeline);
    } catch (error) {
        console.error("Erro ao gerar timeline:", error);
        res.sendStatus(500);
    }
}

export async function searchUsersController(req, res) {
    const { query } = req.query;
    console.log(query);

    try {
        const users = await searchUsers(query);
        return res.json(users);
    } catch (error) {
        console.error("Error searching users:", error);
        res.status(500).json({
            error: "An error occurred while searching users.",
        });
    }
}
